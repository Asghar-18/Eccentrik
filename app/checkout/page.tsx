"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  CheckCircle,
  ShoppingBag,
  MapPin,
  User,
  Phone,
  Mail,
  ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "../context/cart-context";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState("");

  

  // Define typescript interface for form data
  interface FormData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    notes: string;
    paymentMethod: string;
  }

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
    paymentMethod: "cod",
  });

  const shipping =
    formData.city.trim().toLowerCase() === "islamabad" &&
    formData.city.trim() !== ""
      ? 100
      : cart.length > 0
      ? 250
      : 0;
  const total = getCartTotal() + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      paymentMethod: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Generate order number
    const randomOrderNumber =
      "ORD-" + Math.floor(100000 + Math.random() * 900000);

    try {
      // Prepare order data
      const orderData = {
        orderNumber: randomOrderNumber,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          notes: formData.notes,
        },
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
        })),
        subtotal: getCartTotal(),
        shipping: shipping,
        total: total,
        paymentMethod: formData.paymentMethod,
      };

      // Send order to API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to process order");
      }

      // Success - clear cart and show success page
      setOrderNumber(randomOrderNumber);
      clearCart();
      setIsOrderPlaced(true);
    } catch (error) {
      console.error("Error placing order:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to process order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  // If cart is empty and not in success state, redirect to cart
  if (cart.length === 0 && !isOrderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-neutral-100 p-6">
            <ShoppingBag className="h-12 w-12 text-neutral-400" />
          </div>
        </div>
        <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-lg text-neutral-600">
          You cannot proceed to checkout with an empty cart.
        </p>
        <Button asChild size="lg" className="px-8">
          <Link href="/cart">Return to Cart</Link>
        </Button>
      </div>
    );
  }

  // Order success view
  if (isOrderPlaced) {
    return (
      <div className="container mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-14 w-14 text-green-600" />
        </div>
        <h1 className="mb-4 text-4xl font-bold">Order Confirmed!</h1>
        <p className="mb-3 text-xl">Thank you for your purchase</p>
        <div className="mb-6 rounded-lg bg-green-50 px-6 py-3">
          <p className="font-medium text-green-800">
            Order number: <span className="font-bold">{orderNumber}</span>
          </p>
        </div>
        <p className="mb-10 text-lg text-neutral-600">
          We&apos;ve sent the order details to our team and will process your
          order shortly. Your items will be delivered within 3-5 business days.
        </p>
        <div className="flex w-full flex-col space-y-4">
          <Button asChild size="lg" variant="outline" className="font-medium">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild size="lg" className="font-medium">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center">
        <Link
          href="/cart"
          className="mr-4 flex items-center text-base font-medium text-neutral-600 transition hover:text-neutral-900"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Cart
        </Link>
        <h1 className="text-4xl font-bold">Checkout</h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-red-800 font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* Checkout Progress */}
      <div className="mb-12 hidden md:block">
        <div className="flex items-center justify-between">
          <div
            className={`flex flex-1 flex-col items-center ${
              activeStep >= 1 ? "text-primary" : "text-neutral-400"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                activeStep >= 1
                  ? "border-primary bg-primary text-white"
                  : "border-neutral-300 bg-white"
              }`}
            >
              <User className="h-6 w-6" />
            </div>
            <p className="mt-2 text-base font-medium">Contact</p>
          </div>
          <div
            className={`flex-1 border-t-2 ${
              activeStep >= 2 ? "border-primary" : "border-neutral-300"
            }`}
          ></div>
          <div
            className={`flex flex-1 flex-col items-center ${
              activeStep >= 2 ? "text-primary" : "text-neutral-400"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                activeStep >= 2
                  ? "border-primary bg-primary text-white"
                  : "border-neutral-300 bg-white"
              }`}
            >
              <MapPin className="h-6 w-6" />
            </div>
            <p className="mt-2 text-base font-medium">Shipping</p>
          </div>
          <div
            className={`flex-1 border-t-2 ${
              activeStep >= 3 ? "border-primary" : "border-neutral-300"
            }`}
          ></div>
          <div
            className={`flex flex-1 flex-col items-center ${
              activeStep >= 3 ? "text-primary" : "text-neutral-400"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                activeStep >= 3
                  ? "border-primary bg-primary text-white"
                  : "border-neutral-300 bg-white"
              }`}
            >
              <CreditCard className="h-6 w-6" />
            </div>
            <p className="mt-2 text-base font-medium">Payment</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit}>
            {/* Contact Information - Step 1 */}
            <Card
              className={`mb-8 border ${
                activeStep === 1 ? "border-primary shadow-md" : ""
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-2xl">
                    <User className="mr-2 h-6 w-6 text-primary" />
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-base">
                    Please enter your contact details
                  </CardDescription>
                </div>
                <Badge
                  variant={activeStep === 1 ? "default" : "outline"}
                  className={`text-base px-3 py-1 ${
                    activeStep === 1 ? "" : "text-neutral-400"
                  }`}
                >
                  Step 1
                </Badge>
              </CardHeader>

              <CardContent
                className={`space-y-6 ${activeStep !== 1 ? "hidden" : ""}`}
              >
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-neutral-400" />
                    </div>
                    <Input
                      id="fullName"
                      name="fullName"
                      className="pl-10 !bg-white text-base h-12"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-neutral-400" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="pl-10 text-base h-12"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-5 w-5 text-neutral-400" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        className="pl-10 text-base h-12"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              {activeStep === 1 && (
                <CardFooter className="flex justify-end">
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="text-base py-6 px-6"
                  >
                    Continue to Shipping
                  </Button>
                </CardFooter>
              )}

              {activeStep !== 1 && formData.fullName && (
                <CardFooter className="flex items-center justify-between border-t bg-neutral-50 py-4">
                  <div className="text-base">
                    <p className="font-medium">{formData.fullName}</p>
                    <p className="text-neutral-500">
                      {formData.email} • {formData.phone}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveStep(1)}
                    className="text-base"
                  >
                    Edit
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Shipping Address - Step 2 */}
            <Card
              className={`mb-8 border ${
                activeStep === 2 ? "border-primary shadow-md" : ""
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-2xl">
                    <MapPin className="mr-2 h-6 w-6 text-primary" />
                    Shipping Address
                  </CardTitle>
                  <CardDescription className="text-base">
                    Where should we deliver your order?
                  </CardDescription>
                </div>
                <Badge
                  variant={activeStep === 2 ? "default" : "outline"}
                  className={`text-base px-3 py-1 ${
                    activeStep === 2 ? "" : "text-neutral-400"
                  }`}
                >
                  Step 2
                </Badge>
              </CardHeader>

              <CardContent
                className={`space-y-6 ${activeStep !== 2 ? "hidden" : ""}`}
              >
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base font-medium">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter your street address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="text-base h-12"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-base font-medium">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="text-base h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-base font-medium">
                      State/Province
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="State or province"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="text-base h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-base font-medium">
                    ZIP / Postal Code
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="ZIP or postal code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="text-base h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="notes"
                    className="flex items-center text-base font-medium"
                  >
                    <ClipboardList className="mr-2 h-5 w-5 text-neutral-500" />
                    Order Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    className="min-h-32 text-base"
                    placeholder="Add any special instructions or delivery notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>

              {activeStep === 2 && (
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="text-base py-6 px-6"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="text-base py-6 px-6"
                  >
                    Continue to Payment
                  </Button>
                </CardFooter>
              )}

              {activeStep !== 2 && formData.address && (
                <CardFooter className="flex items-center justify-between border-t bg-neutral-50 py-4">
                  <div className="text-base">
                    <p className="font-medium">{formData.address}</p>
                    <p className="text-neutral-500">
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveStep(2)}
                    className="text-base"
                  >
                    Edit
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Payment Method - Step 3 */}
            <Card
              className={`mb-8 border ${
                activeStep === 3 ? "border-primary shadow-md" : ""
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-2xl">
                    <CreditCard className="mr-2 h-6 w-6 text-primary" />
                    Payment Method
                  </CardTitle>
                  <CardDescription className="text-base">
                    Select your preferred payment method
                  </CardDescription>
                </div>
                <Badge
                  variant={activeStep === 3 ? "default" : "outline"}
                  className={`text-base px-3 py-1 ${
                    activeStep === 3 ? "" : "text-neutral-400"
                  }`}
                >
                  Step 3
                </Badge>
              </CardHeader>

              <CardContent
                className={`space-y-6 ${activeStep !== 3 ? "hidden" : ""}`}
              >
                <RadioGroup
                  defaultValue="cod"
                  value={formData.paymentMethod}
                  onValueChange={handleRadioChange}
                >
                  <div className="flex items-center space-x-4 rounded-lg border p-5 transition-colors hover:bg-neutral-50">
                    <RadioGroupItem value="cod" id="cod" className="h-6 w-6" />
                    <Label
                      htmlFor="cod"
                      className="flex flex-1 cursor-pointer items-center"
                    >
                      <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                        <Truck className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Cash on Delivery</p>
                        <p className="text-base text-neutral-500">
                          Pay when your order arrives
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-4 rounded-lg border p-5 opacity-70">
                    <RadioGroupItem
                      value="card"
                      id="card"
                      disabled
                      className="h-6 w-6"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-1 cursor-not-allowed items-center"
                    >
                      <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                        <CreditCard className="h-8 w-8 text-neutral-500" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Card Payment</p>
                        <p className="text-base text-neutral-500">
                          Coming soon
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>

              {activeStep === 3 && (
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="text-base py-6 px-6"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-40 text-base py-6 px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </form>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="max-h-72 overflow-y-auto space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center gap-4 py-2"
                  >
                    <div className="h-16 w-16 flex-shrink-0 rounded-md bg-neutral-100 flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-neutral-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-base">
                        {item.name}
                      </p>
                      <p className="text-base text-neutral-500">
                        {item.size && `Size: ${item.size}`} • Qty:{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <p className="flex-shrink-0 font-medium text-base">
                      Rs.{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </CardContent>
              <Separator />
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-1">
                    <p className="text-neutral-600 text-lg">Subtotal</p>
                    <p className="font-medium text-lg">
                      Rs.{getCartTotal().toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between py-1">
                    <p className="text-neutral-600 text-lg">Shipping</p>
                    <p className="font-medium text-lg">
                      Rs.{shipping.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between border-t border-neutral-200 py-4 mt-4">
                  <p className="text-xl font-bold">Total</p>
                  <p className="text-xl font-bold">Rs.{total.toFixed(2)}</p>
                </div>
              </CardContent>
              <CardFooter className="bg-neutral-50 border-t rounded-b-lg">
                <div className="w-full text-base space-y-2">
                  <div className="flex items-center text-neutral-600">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    <p>Secure checkout</p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <div className="hidden lg:block">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          100% Satisfaction Guarantee
                        </p>
                        <p className="text-base text-neutral-500">
                          If you&apos;re not satisfied, we&apos;ll make it
                          right.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">Fast Delivery</p>
                        <p className="text-base text-neutral-500">
                          Delivery within 3-5 business days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">Secure Payment</p>
                        <p className="text-base text-neutral-500">
                          Your information is protected.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
