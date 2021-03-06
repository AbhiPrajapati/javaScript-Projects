document.getElementById('loan-form').addEventListener('submit',function (e){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResult ,2000);
    e.preventDefault();
});


function calculateResult()
{


    const amount   =  document.getElementById('amount');
    const interest   =  document.getElementById('interest');
    const years   =  document.getElementById('years');
    const monthlyPayment  =  document.getElementById('monthly-payment');
    const totalPayment   =  document.getElementById('total-payment');
    const totalInterest   =  document.getElementById('total-interest');

    const principal  = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 /12 ;
    const calculatedPayments = parseFloat(years.value) * 12 ;


    //monthly payments 
    const x = Math.pow(1 + calculatedInterest , calculatedPayments);
    const monthly = ( principal * x * calculatedInterest) / (x-1);

    if(isFinite(monthly))
    {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value  = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)- principal).toFixed(2);
         document.getElementById('loading').style.display = 'none';
         document.getElementById('results').style.display = 'block';
      


    }else{
        showError('Please check something went wrong !!!!');
    }

    
}

function showError(error){

     document.getElementById('loading').style.display = 'none';
     document.getElementById('results').style.display = 'none';

    const card  = document.querySelector( '.card');
    const heading  = document.querySelector( '.heading');
    
    const divElement = document.createElement('div');
    divElement.className = 'alert alert-danger';
    divElement.appendChild(document.createTextNode(error));
    card.insertBefore(divElement, heading);
    setTimeout(()=>{
       document.querySelector('.alert').remove();
    }, 3000);
}

