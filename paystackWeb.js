function Test(){
    return 12+24;
}
function payWithPaystack(){
    localStorage.setItem('paystack', 'waiting');
    var handler = PaystackPop.setup({
      key: 'pk_test_277c53a98499bf6879daea5e6442e3ffdf45c573',
      email: 'customer@email.com',
      amount: 10000,
      currency: "NGN",
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
         custom_fields: [
            {
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: "+2348012345678"
            }
         ]
      },
      callback: function(response){
          //alert('success. transaction ref is ' + response.reference);
          console.log(response);
          localStorage.setItem('paystack', 'done');
          localStorage.setItem('response', JSON.stringify(response));
          return response.reference;
      },
      onClose: function(){
          //alert('window closed');
          console.log("error");
          localStorage.setItem('paystack', 'closed');
          return "error";
      }
    });
    handler.openIframe();
  }

  function get_response(){
    return localStorage.getItem("response");
  }
  function get_status(){
    return localStorage.getItem("paystack");
  }

  function payWithPaystackWeb(amount, email, phone_number, key){
    localStorage.setItem('response', '');
    localStorage.setItem('paystack', '');
    var d = new Date();
    var n = d.getTime();
                  var handler = PaystackPop.setup({
                    key: key,
                    email: email,
                    amount: (0.05 *(amount*100) + (amount*100)),//40000,//$("#sub_total_id").text()*100,
                    currency: "NGN",
                    ref: 'ChargedFromWeb'+n, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                    metadata: {
                       custom_fields: [
                          {
                              display_name: "Mobile Number",
                              variable_name: "mobile_number",
                              value: phone_number
                          }
                       ]
                    },
                    callback: function(response){
                        //alert('success. transaction ref is ' + response.reference);
                        localStorage.setItem('paystack', 'done');
                        localStorage.setItem('response', JSON.stringify(response));
                    },
                    onClose: function(){
                        //alert('window closed');
                        localStorage.setItem('paystack', 'closed');
                    }
                  });
                  handler.openIframe();
                }