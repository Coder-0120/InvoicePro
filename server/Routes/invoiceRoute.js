const express = require("express");
const router = express.Router();
const invoice = require("../Models/invoiceSchema");
const business = require("../Models/businessSchema");


// Create Invoice
router.post("/create", async (req, res) => {
  try {
    const { customer, items, userId } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!customer || !customer.name) {
      return res.status(400).json({ message: "Customer name is required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "At least one item is required" });
    }

    // Find business data
    const businessData = await business.findOne({ userId });
    if (!businessData) {
      return res.status(400).json({ message: "Business not found. Please create a business profile first." });
    }

    const businessId = businessData._id;

    // Create business snapshot
    const businessSnapshot = {
      businessName: businessData.businessName,
      businessOwner: businessData.businessOwner,
      address: businessData.Address,
      contactNo: businessData.contactNo,
      gstNumber: businessData.gstNumber,
      tax: {
        cgst: businessData.tax?.cgst || 0,
        sgst: businessData.tax?.sgst || 0
      }
    };

    // Calculate totals
    let subTotal = 0;
    let taxAmount = 0;

    const updatedItems = items.map(item => {
      const itemSubtotal = item.price * item.quantity;
      const cgstAmount = (businessData.tax?.cgst || 0) / 100 * itemSubtotal;
      const sgstAmount = (businessData.tax?.sgst || 0) / 100 * itemSubtotal;
      const itemTotal = itemSubtotal + cgstAmount + sgstAmount;

      subTotal += itemSubtotal;
      taxAmount += cgstAmount + sgstAmount;

      return {
        itemName: item.itemName,
        quantity: item.quantity,
        price: item.price,
        tax: {
          cgst: businessData.tax?.cgst || 0,
          sgst: businessData.tax?.sgst || 0
        },
        total: itemTotal
      };
    });

    const grandTotal = subTotal + taxAmount;

    // Create new invoice
    const newInvoice = await invoice.create({
      userId,
      businessId,
    //   invoiceNumber: null, // Will be assigned later or by another system
      businessSnapshot,
      customer: {
        name: customer.name,
        phone: customer.phone || '',
        email: customer.email || '',
        address: customer.address || ''
      },
      items: updatedItems,
      subTotal,
      taxAmount,
      grandTotal,
      status: "draft"
    });

    return res.status(201).json({ 
      message: "Invoice created successfully", 
      invoice: newInvoice 
    });

  } catch (error) {
    console.error('Error creating invoice:', error);
    return res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
});


// get all invoices

router.get("/allmy/:userId", async (req, res) => {
    try {
        const {userId}=req.params ;
        // const userId = ;
        const myinvoices = await invoice.find({ userId });
        if (!myinvoices) {
            return res.status(401).json({ message: "no invoice exist" });
        }
        return res.status(201).json({ message: "all invoices fetched successfully..", invoices: myinvoices });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

// to get particular invoice using id 

router.get("/my/:id", async (req, res) => {
    try {
        const invoiceid = req.params.id;
        const myinvoices = await invoice.findById(invoiceid);
        if (!myinvoices) {
            return res.status(401).json({ message: "no invoice exist" });
        }
        return res.status(201).json({ message: "invoices fetched successfully..", invoice: myinvoices });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

// to update invoices only when we havee draft status 

router.put("/:id", async (req, res) => {
    try {
        const invoiceid = req.params.id;
        const { customer, items } = req.body;
        const existInvoice = await invoice.findById(invoiceid);
        if (!existInvoice) {
            return res.status(401).json({ message: "no invoice exist" });
        }
        if (existInvoice.status !== "draft") {
            return res.status(401).json({ message: "invoices cannot updated.." });
        }
        const businessdata = await business.findById(existInvoice.businessId);
        if (!businessdata) {
            return res.status(201).json({ message: "businesdata not found.." });
        }
        // calculate tax for updated value
        let subTotal = 0;
        let taxAmount = 0;
        const updatedItems = items.map(item => {
            const cgstAmount = (businessdata.tax.cgst / 100) * item.price * item.quantity;
            const sgstAmount = (businessdata.tax.sgst / 100) * item.price * item.quantity;
            const total = item.price * item.quantity + cgstAmount + sgstAmount;

            subTotal += item.price * item.quantity;
            taxAmount += cgstAmount + sgstAmount;

            return {
                ...item,
                tax: {
                    cgst: businessdata.tax.cgst,
                    sgst: businessdata.tax.sgst
                },
                total
            };
        });
        const grandTotal = subTotal + taxAmount;

        // update the invoice...
        existInvoice.customer=customer;
        existInvoice.items=updatedItems;
        existInvoice.subTotal=subTotal;
        existInvoice.taxAmount=taxAmount;
        existInvoice.grandTotal=grandTotal;
        await existInvoice.save();
        return res.status(201).json({ message: "invoices updated successfully..", invoices:existInvoice  });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

// to finalize the invoice,allocate invoiceno and change status from draft to unpaid
router.put("/finalize/:id", async (req, res) => {
    try {
        const invoiceid = req.params.id;
        const existInvoice = await invoice.findById(invoiceid);
        if (!existInvoice) {
            return res.status(401).json({ message: "no invoice exist" });
        }
        if (existInvoice.status !== "draft") {
            return res.status(401).json({ message: "invoices cannot finalized.." });
        }

        // update the invoice...draft to unpaid and give unique invoice no.
        existInvoice.status="unpaid";
        existInvoice.invoiceNumber=`INV-${Date.now()} `;
        await existInvoice.save();
        return res.status(201).json({ message: "invoices finalized successfully..", invoice:existInvoice  });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})


// to change status from unpaid to paid 
router.put("/paid/:id", async (req, res) => {
    try {
        const invoiceid = req.params.id;
        const existInvoice = await invoice.findById(invoiceid);
        if (!existInvoice) {
            return res.status(401).json({ message: "no invoice exist" });
        }
        if (existInvoice.status !== "unpaid") {
            return res.status(401).json({ message: "invoices status cannot made paid.." });
        }
        // change status
        existInvoice.status="paid";
        await existInvoice.save();
        return res.status(201).json({ message: "invoices status changed successfully..", invoices:existInvoice  });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

// to cancel any draft or unpaid invoices
router.put("/cancel/:id", async (req, res) => {
    try {
        const invoiceid = req.params.id;
        const existInvoice = await invoice.findById(invoiceid);
        if (!existInvoice) {
            return res.status(401).json({ message: "no invoice exist" });
        }
        if (existInvoice.status === "cancelled") {
            return res.status(401).json({ message: "invoices is already cancelled.." });
        }
        if (existInvoice.status === "paid") {
            return res.status(401).json({ message: "paid invoices cannot be cancelled.." });
        }
        // change status from draft/ unpaid to cancelled
        existInvoice.status="cancelled";
        await existInvoice.save();
        return res.status(201).json({ message: "invoices cancelled successfully..", invoices:existInvoice  });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})


module.exports = router;