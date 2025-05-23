// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

interface OrderData {
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();

    // Create transporter (configure based on your email provider)
    const transporter = nodemailer.createTransport({
      // For Gmail
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // App password for Gmail
      },
      // For other providers, use SMTP settings:
      // host: 'smtp.yourdomain.com',
      // port: 587,
      // secure: false,
      // auth: {
      //   user: process.env.EMAIL_USER,
      //   pass: process.env.EMAIL_PASSWORD,
      // },
    });

    // Generate order items HTML
    const orderItemsHtml = orderData.items
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0;">${item.name}</td>
          <td style="padding: 12px 0; text-align: center;">${item.size || 'N/A'}</td>
          <td style="padding: 12px 0; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px 0; text-align: right;">Rs.${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
      )
      .join('');

    // Email HTML template
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Received</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #374151; margin: 0; padding: 0; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #1f2937; color: white; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; font-weight: bold;">🎉 New Order Received!</h1>
          <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Order #${orderData.orderNumber}</p>
        </div>

        <!-- Customer Information -->
        <div style="padding: 24px;">
          <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 16px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Customer Information</h2>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${orderData.customer.fullName}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${orderData.customer.email}</p>
            <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${orderData.customer.phone}</p>
            <p style="margin: 0 0 8px 0;"><strong>Address:</strong> ${orderData.customer.address}</p>
            <p style="margin: 0;"><strong>City, State ZIP:</strong> ${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zipCode}</p>
            ${orderData.customer.notes ? `<p style="margin: 8px 0 0 0;"><strong>Notes:</strong> ${orderData.customer.notes}</p>` : ''}
          </div>

          <!-- Order Items -->
          <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 16px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Order Items</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="background-color: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                <th style="padding: 12px 0; text-align: left; font-weight: 600;">Product</th>
                <th style="padding: 12px 0; text-align: center; font-weight: 600;">Size</th>
                <th style="padding: 12px 0; text-align: center; font-weight: 600;">Qty</th>
                <th style="padding: 12px 0; text-align: right; font-weight: 600;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHtml}
            </tbody>
          </table>

          <!-- Order Summary -->
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span>Subtotal:</span>
              <span>Rs.${orderData.subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span>Shipping:</span>
              <span>Rs.${orderData.shipping.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #e5e7eb; font-weight: bold; font-size: 18px;">
              <span>Total:</span>
              <span>Rs.${orderData.total.toFixed(2)}</span>
            </div>
          </div>

          <!-- Payment Method -->
          <div style="background-color: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-weight: 600;">Payment Method: ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : orderData.paymentMethod}</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            This order was placed on ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send email to store owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.STORE_OWNER_EMAIL, // Store owner's email
      subject: `🛒 New Order #${orderData.orderNumber} - Rs.${orderData.total.toFixed(2)}`,
      html: emailHtml,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Order processed successfully',
      orderNumber: orderData.orderNumber 
    });

  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process order' },
      { status: 500 }
    );
  }
}