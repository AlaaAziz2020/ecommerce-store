 import React, { useState } from "react";
 import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBTypography } from "mdb-react-ui-kit";
import '../CheckoutPage/CheckoutPage.css'
 export default function CheckoutPage() {
   const [formData, setFormData] = useState({
     fullName: "",
     address: "",
     city: "",
     phone: "",
     notes: "",
   });

   const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
     e.preventDefault();
     console.log("Order Submitted:", formData);
     alert("Order submitted! Thank you for shopping.");
   };

   return (
     <MDBContainer className="py-5">
       <MDBRow className="justify-content-center">
         <MDBCol md="8">
         <MDBCard className="checkout-card">             
          <MDBCardBody>
          <MDBTypography tag="h4" className="mb-4 text-center checkout-title">
  Checkout
</MDBTypography>

               <form onSubmit={handleSubmit}>
                 <MDBInput
                   label="Full Name"
                   name="fullName"
                   value={formData.fullName}
                   onChange={handleChange}
                   className="mb-4"
                   required
                 />
                 <MDBInput
                   label="Address"
                   name="address"
                   value={formData.address}
                   onChange={handleChange}
                   className="mb-4"
                   required
                 />
                 <MDBInput
                   label="City"
                   name="city"
                   value={formData.city}
                   onChange={handleChange}
                   className="mb-4"
                   required
                 />
                 <MDBInput
                   label="Phone Number"
                   name="phone"
                   type="tel"
                   value={formData.phone}
                   onChange={handleChange}
                   className="mb-4"
                   required
                 />
                 <MDBInput
                   label="Order Notes (optional)"
                   name="notes"
                   textarea
                   rows={3}
                   value={formData.notes}
                   onChange={handleChange}
                   className="mb-4"
                 />
                 <MDBBtn type="submit" color="success" className="confirm w-100">
                   Confirm Order
                 </MDBBtn>
               </form>
             </MDBCardBody>
           </MDBCard>
         </MDBCol>
       </MDBRow>
     </MDBContainer>
   );
 }
