const Spinner=document.getElementById('spinnerid');
const Card_Container=document.getElementById('cardcontainer');
const LoadMoreButton=document.getElementById('loadmorebutton');

const LoadAllCard= async (url,dataLimit)=>{
    try{
        const res=await fetch(url);
        const Data= await res.json();
        DisplayAllCard(Data.data.tools,dataLimit);
    }catch(err){
        console.log(`Error: ${err}`)
    }
}


const LoadSingleData= async url=>{
  //url=`https://openapi.programming-hero.com/api/ai/tool/10`
  try{
    const res=await fetch(url);
    const Data=await res.json();
    SetDataInModal(Data.data);
  }catch(err){
    console.log(`Error from getting single item: ${err}`)
  }
}

const SetDataInModal= Data=>{
    // if(Data===12){
    //     Data==11;
    // }
    console.log("Check ID: "+Data.id)
    console.log("tool Name: "+Data.tool_name);


    const Description=Data.description;
    console.log(Description)
    document.getElementById('modaldesc').innerHTML=Description;

    const Input=Data.input_output_examples?Data.input_output_examples[0].input: "Can you give any example?" ;
    console.log(Input);
    document.getElementById('input').innerHTML=Input;
   

    const Output=Data.input_output_examples?Data.input_output_examples[0].output: "No! Not Yet! Take a break!!!";
    console.log(Output);
    document.getElementById('output').innerHTML=Output;

    const Plan1=Data.pricing?Data.pricing[0].plan:"Cost/ Basic"
    console.log(Plan1)
    document.getElementById('plane_1').innerHTML=Plan1
  

    const Price1=Data.pricing?Data.pricing[0].price:"Free of";
    console.log(Price1)
    document.getElementById('price_1').innerHTML=Price1

    const Plan2=Data.pricing?Data.pricing[1].plan:"Cost/ Pro"
    console.log(Plan2)
    document.getElementById('plan_2').innerHTML=Plan2;
 

    const Price2=Data.pricing?Data.pricing[1].price:"Free of"
    console.log(Price2)
    document.getElementById('price_2').innerHTML=Price2;
  

    const Enterprise=Data.pricing?Data.pricing[2].plan:"Enterprise"
    console.log(Enterprise)
    document.getElementById('enterprise').innerHTML=Enterprise;

    const Contact=Data.pricing?Data.pricing[2].price:"Free of cost/ "
    console.log(Contact)
    document.getElementById('contact').innerHTML=Contact;


    const Feature_1=Data.features[1].feature_name;
    console.log(Feature_1);
    document.getElementById('feature_1').innerHTML=Feature_1;
  
   
    const Feature_2=Data.features[2].feature_name;
    console.log(Feature_2);
    document.getElementById('feature_2').innerHTML=Feature_2;
  

    const Feature_3=Data.features[3].feature_name;
    console.log("Feature-3: "+Feature_3);
    document.getElementById('feature_3').innerHTML=Feature_3;


    const CheckIntegration=Data.integrations;
   // console.log("Check Integration: "+CheckIntegration)
   if(CheckIntegration===null){
      console.log("Check Integration: "+CheckIntegration)
      document.getElementById('integration_1').innerHTML='No data Found';
      document.getElementById('integration_2').classList.add('d-none')
      document.getElementById('integration_3').classList.add('d-none')
   }else{
    console.log("Check Integration: "+CheckIntegration)
    const Integration_1=Data.integrations[0]?Data.integrations[0]:"NoData";
    console.log("Integration-1: "+Integration_1);

    const Integration_2=Data.integrations[1]?Data.integrations[1]:"NoData";
    console.log("Integration-2: "+Integration_2);
 
    const Integration_3=Data.integrations[2]?Data.integrations[2]:"NoData";
    console.log("Integration-3: "+Integration_3);


      ////Integration Work Start
      if(Integration_1==='NoData'){
        document.getElementById('integration_1').innerHTML='No data Found';
        document.getElementById('integration_2').classList.add('d-none')
        document.getElementById('integration_3').classList.add('d-none')
    }else{
        document.getElementById('integration_1').innerHTML=Integration_1
        document.getElementById('integration_2').innerHTML=Integration_2
        document.getElementById('integration_3').innerHTML=Integration_3
        document.getElementById('integration_2').classList.remove('d-none')
        document.getElementById('integration_3').classList.remove('d-none')
    }

    if(Integration_2==='NoData'){
        document.getElementById('integration_2').classList.add('d-none')
        document.getElementById('integration_3').classList.add('d-none')
    }else{
        document.getElementById('integration_2').innerHTML=Integration_2
        document.getElementById('integration_3').innerHTML=Integration_3

        document.getElementById('integration_2').classList.remove('d-none')
        document.getElementById('integration_3').classList.remove('d-none')
    }

    if(Integration_3==='NoData'){
        document.getElementById('integration_3').classList.add('d-none')
    }else{
        document.getElementById('integration_3').innerHTML=Integration_3
        document.getElementById('integration_3').classList.remove('d-none')

    }
    ////Integration Work end
  
   }

    
   

    const Accuracy=Data.accuracy.score;  
    console.log(Accuracy)

    const Picture=Data.image_link[0];
    console.log(Picture)

  

    ///Accuracy Work start
    if(Accuracy===null){
        document.getElementById('accuracubox').classList.add('d-none');
        document.getElementById('imgid').style.marginTop='0px'
    }else{
        document.getElementById('accuracy').innerHTML=Accuracy;

        document.getElementById('accuracubox').classList.remove('d-none');
        document.getElementById('imgid').style.marginTop='-30px'
    }

    ///Accuracy Work end

    document.getElementById('imgid').src=Picture

}

const DisplayAllCard=(Card,dataLimit)=>{
      ///Show 5 Item start
      if(dataLimit){
        Card=Card.slice(0,dataLimit)   
      }else{
      
      }     
      ///Show 5 Item end

    Card_Container.innerHTML='';
    Card.forEach(card=>{

        ////Delete Spinner start
        Spinner.classList.add('d-none')
        //Delete Spinner end
       // console.log(card)
       const card_div=document.createElement('div');
        card_div.classList.add('col');
        card_div.innerHTML=`
                <div class="card p-1">
                <img src="${card.image}" class="card-img-top " alt="...">
                <div class="card-body">
                <h5 class="card-title fw-bolder">Features</h5>
                <p class="card-text">
                    
                    <ol>
                        <li>${card.features[0]}</li>
                        <li>${card.features[1]}</li>
                        <li>${card.features[2]}</li>
                    </ol>
                </p>
                <hr>
                <div class="CardFooter d-flex justify-content-between">
                    <div class="LeftSide">
                        <h6 class="fw-bold">${card.name}</h6>
                        <div class="Date d-flex ">
                            <i class="bi bi-calendar2-week-fill"></i>
                            <p class="mx-2"> ${card.published_in} </p>
                        </div>
                    </div>
                    <div class="RightSide d-flex align-items-center">
                        <button onclick="singledata(${card.id})" class="arrow_btn" data-bs-toggle="modal" data-bs-target="#AIModal" ><i class="bi bi-arrow-right"></i></button>
                    </div>
                </div>

                </div>
            </div>
        `
        Card_Container.appendChild(card_div)
    })
}

const singledata=id=>{
    id=''+id;
    if(id.length===1){
        id='0'+id;
    }
    // console.log("Length of id: "+id.length);
    // console.log("button Pressed and ID: "+id)
    LoadSingleData(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
}



//By Default Show 6 card start
LoadAllCard(`https://openapi.programming-hero.com/api/ai/tools`,6);
//By Default Show 6 card end


// See More Button Start
LoadMoreButton.addEventListener('click',()=>{
    console.log("Clicked Load More Button");
    LoadAllCard(`https://openapi.programming-hero.com/api/ai/tools`);
    LoadMoreButton.classList.add('d-none')
})
//See More Button End



//=================================================
//==================Sorting Data===================
//=================================================

const SortButton=document.getElementById('sortdata');


const customSort=(a,b)=>{
    const dateA=new Date(a.published_in);
    const dateB=new Date(b.published_in);
    if(dateA>dateB){
        return 1;
    }else if(dateA<dateB){
        return -1;
    }
    return 0;

}

const NewLoadAllCard= async (url,dataLimit)=>{
    try{
        const res=await fetch(url);
        const Data= await res.json();
        NewDisplayAllCard(Data.data.tools,dataLimit);
    }catch(err){
        console.log(`Error: ${err}`)
    }
}

const NewDisplayAllCard=(Card,dataLimit)=>{
    ///Show 5 Item start
    if(dataLimit){
      Card=Card.slice(0,dataLimit)   
    }else{
    
    }     
    ///Show 5 Item end

  Card_Container.innerHTML='';
  const GetSortedCard=Card.sort(customSort)
  Card.forEach(card=>{

      ////Delete Spinner start
      Spinner.classList.add('d-none')
      //Delete Spinner end
     // console.log(card)
     const card_div=document.createElement('div');
      card_div.classList.add('col');
      card_div.innerHTML=`
              <div class="card p-1">
              <img src="${card.image}" class="card-img-top " alt="...">
              <div class="card-body">
              <h5 class="card-title fw-bolder">Features</h5>
              <p class="card-text">
                  <ol>
                      <li>${card.features[0]}</li>
                      <li>${card.features[1]}</li>
                      <li>${card.features[2]}</li>
                  </ol>
              </p>
              <hr>
              <div class="CardFooter d-flex justify-content-between">
                  <div class="LeftSide">
                      <h6 class="fw-bold">${card.name}</h6>
                      <div class="Date d-flex ">
                          <i class="bi bi-calendar2-week-fill"></i>
                          <p class="mx-2"> ${card.published_in} </p>
                      </div>
                  </div>
                  <div class="RightSide d-flex align-items-center">
                      <button onclick="singledata(${card.id})" class="arrow_btn" data-bs-toggle="modal" data-bs-target="#AIModal" ><i class="bi bi-arrow-right"></i></button>
                  </div>
              </div>

              </div>
          </div>
      `
      Card_Container.appendChild(card_div)
  })
}




SortButton.addEventListener('click',()=>{
    console.log("Sort Button");
    NewLoadAllCard(`https://openapi.programming-hero.com/api/ai/tools`);
    LoadMoreButton.classList.add('d-none')
})