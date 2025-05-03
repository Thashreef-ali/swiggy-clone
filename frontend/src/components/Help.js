import React ,{useState}from 'react'
import Navbar from '../components/Navbar'

function Help() {
    const [selectedCategory, setSelectedCategory] = useState("Partner Onboarding");
    const categories = [
        "Partner Onboarding",
        "Legal",
        "FAQs",
        "Instamart Onboarding",
      ];
    
      const faqs = {
        "Partner Onboarding": [
          "I want to partner my restaurant with Swiggy",
          "What are the mandatory documents needed to list my restaurant on Swiggy?",
          "I want to opt-out from Google reserve",
          "After I submit all documents, how long will it take for my restaurant to go live on Swiggy?",
          "What is this one time Onboarding fees? Do I have to pay for it while registering?",
          "Who should I contact if I need help & support in getting onboarded?",
          "How much commission will I be charged by Swiggy?",
          "I don’t have an FSSAI licence for my restaurant. Can it still be onboarded?"
        ],
        "Legal": [
          "Terms of Use",
          "Privacy Policy",
          "Cancellations and Refunds",
          "Terms of Use for Swiggy ON-TIME / Assured"
        ],
        "FAQs": [
            "What is Swiggy Customer Care Number?",
            "I want to explore career opportunities with Swiggy",
            "I want to provide feedback",
            "Can I edit my order?",
            "I want to cancel my order",
            "Will Swiggy be accountable for quality/quantity?",
            "Is there a minimum order value?",
            "Do you charge for delivery?",
            "How long do you take to deliver?",
            "What are your delivery hours?",
            "Can I order from any location?",
            "Is single order from many restaurants possible?",
            "Do you support bulk orders?",
            "Can I order in advance?",
            "Can I change the address / number?",
            "Did not receive OTP?",
            "Did not receive referral coupon?",
            "Deactivate my account",
            "Unable to view the details in my profile",
           " What is Swiggy Money?",
            "Do you accept Sodexo, Ticket Restaurant etc.?",
            "I want an invoice for my order,"
],
        "Instamart Onboarding": [
           " I want to partner with Instamart",
           " How many cities does Instamart operate in?",
           " What is the time to onboard?",
           " What flavour/grammage moves the best?",
           " What are the expected volumes in the first 30 days?",
            "Do I get sales data?",
            "How do ads work?",
            "What are the opportunities for expansion into new cities/SKUs?"
        ],
      };
  return (
    <>
    <Navbar/>
    <div className="help-container">
      {/* Header */}
      <div className="help-header">
        <h2>Help & Support</h2>
        <p style={{color:"white"}}>Let's take a step ahead and help you better.</p>
      </div>

      {/* Main Content */}
      <div className="help-content">
        {/* Sidebar */}
        <div className="help-sidebar">
          {categories.map((category) => (
            <div
              key={category}
              className={`sidebar-item ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="help-main">
          <h3>{selectedCategory}</h3>
          <div className="accordion" id="faqAccordion">
            {faqs[selectedCategory].map((question, index) => (
              <div key={index} className="accordion-item">
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    {question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    This is a placeholder answer for "{question}". You can update it with real content.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Help