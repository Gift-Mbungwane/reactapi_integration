import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import $, { post } from 'jquery';
import { type } from '@testing-library/user-event/dist/type';

function App({navigationRef}) {
  //model Name
  const [name, setName] = useState('');
   //Age
  const [age, setAge] = useState('');
  const [stateAge, setStateAge] = useState(0);
  //Health
  const [health, setHealth] = useState('');
  const [selectHealth, setSelectHealth]= useState([]);
  const [stateHealth,setStateHealth] = useState(selectHealth[0]);
  //Preg
  const [preg, setPreg] = useState('');
  const [selectPreg, setSelectPreg]= useState([]);
  const [ statePregnant,setStatePregnant] = useState(selectPreg[0]);
  //No. of drink p/day
  const [drinkPerday, setDrinkPerday] = useState('');
  const [stateConsumePerDay, setStateConsumePerDay] = useState(0);

  //No. of drink 2day
  const [drinkToday, setDrinkToday] = useState('');
  const [stateConsumeToday, setStateConsumeToday] = useState(0);

//Drink
  const [drinkList, setListOfDrinks] = useState([]);
  const [drink, setDrink]= useState('');
  const [choiceOfDrink,setStatechoiceOfDrink] = useState(drinkList[0])
  //temp
  const [temperature,setTemperature] = useState('');
  const [stateTemperature, setStateTemperature] = useState(0)
  //gender
  const [gender, setGender ] = useState('');
  const [selectGender, setSelectGender] = useState([]);
  const [stateGender,setStateGender] = useState(selectGender[0]);
  //Sensitive
  const [sensitive, setSensitivity] = useState('');
  const [selectSensitive, setSelectSensitivity]= useState([]);
  const [stateSensitive,setStateSensitive] =useState(selectSensitive[0]);
//time
const [times, setTimes]= useState('');
const [selectTIme, setSelectTime]= useState([]);
const [stateTimeofDay,setStateTimeofDay] = useState(selectTIme[0]);

//Decision
const[decisionList, setDecisionList] = useState([]);
 
 async function sendDrinkDetails() {
  if (stateAge <= 10 || stateAge >= 90){
    alert("Age cannot be less than 10 years or above 90 years")
  } if (stateTemperature <= 0 || stateTemperature >= 48){
    alert("Temparature cannot be less than 0 or above 48 degrees celsius")
  } if(stateConsumePerDay < 0  || stateConsumePerDay > 148){
    alert('comsumption caanot be less than zero')
  } if(stateConsumeToday < 0 || stateConsumeToday > 148){
    alert('comsumption caanot be less than zero')
  } else {
    const data = JSON.stringify({ 
      consumeToday:stateConsumeToday,
      age: stateAge,
      choiceOfDrink: choiceOfDrink,
      temperature: stateTemperature,
      gender: stateGender,
      sensitive: stateSensitive,
      timeofDay: stateTimeofDay,
      pregnant : statePregnant,
      health : stateHealth,
      consumePerDay: stateConsumePerDay,
    });

 
  // fetch('https://api.up2tom.com/v3/decision', requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data, 'data has been posted')
  //     }
  //       // this.setState({ postId: data.id })
  //       ).catch((error) => console.log(error, "error posting data to decision"))

        //

        await $.post({
          url: 'https://api.up2tom.com/v3/decision',
          headers: { 'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979' },
          contentType: 'application/vnd.api+json',
          data: [{
            attributes: {
              description: "the results of your choice",
              metadata: {
                domain: {
                  values: [data]
                }
              }
            },
            id: "58d3bcf97c6b1644db73ad12",
            type: "decision",
          }]
        })
      .then(() => {
        alert('data has been posted');
      }).catch((error) => console.log(error, "error getting data to decision"))
  }
}

  useEffect(() => {
    async function fetchData() {
      // retrieve from Up2Tom API
      await $.get({
        url: 'https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12',
        headers: { 'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979' },
        contentType: 'application/vnd.api+json'
      }).then((data) => {
        //Questions
        setName(data.data.attributes.name);
        setTemperature(data.data.attributes.metadata.attributes[0].question);
        setGender(data.data.attributes.metadata.attributes[1].question);
        setAge(data.data.attributes.metadata.attributes[2].question);
        setSensitivity(data.data.attributes.metadata.attributes[3].question);
        setTimes(data.data.attributes.metadata.attributes[4].question);
        setPreg(data.data.attributes.metadata.attributes[5].question);
        setHealth(data.data.attributes.metadata.attributes[6].question);
        setDrinkPerday(data.data.attributes.metadata.attributes[7].question);
        setDrinkToday(data.data.attributes.metadata.attributes[8].question);
        setDrink(data.data.attributes.metadata.prediction.question);

        //Value-Options-for-questions
        setListOfDrinks(data.data.attributes.metadata.prediction.domain.values);
        setSelectGender(data.data.attributes.metadata.attributes[1].domain.values);
        setSelectSensitivity(data.data.attributes.metadata.attributes[3].domain.values);
        setSelectTime(data.data.attributes.metadata.attributes[4].domain.values);
        setSelectPreg(data.data.attributes.metadata.attributes[5].domain.values);
        setSelectHealth(data.data.attributes.metadata.attributes[6].domain.values);

       // console.log(data.data.attributes.metadata.prediction.domain.values, 'data from then');
       // console.log(data.data.attributes.metadata.attributes, 'data from then');
      }).catch((error) => {
        console.log(error, 'from the api')
      });

      //getting details from Decision model
      await $.get({
      url: 'https://api.up2tom.com/v3/decision',
      headers: { 'Authorization': 'Token 9307bfd5fa011428ff198bb37547f979' },
      contentType: 'application/vnd.api+json'
    }).then((document) => {
        console.log(document, 'the data from decision');
    }).catch((error) => {
      console.log(error, 'the error is from geting details from decision');
    })
    }
    fetchData();
  },[]); 

  return (
    <div className="App">
      <div className='flex-right-container'>
      <header className="">
        <div className='h1-link'>
        <h1 className='text-sky-400'>{name}</h1>
        </div>
        <div className="col-span-6 sm:col-span-3">
        <p className='p'>{drink}</p>
        <select
        defaultValue={choiceOfDrink}
        type='text'
          id="choiceOfDrink"
          name="choiceOfDrink"
          autoComplete="choiceOfDrink"
          className="mt-1 block w-full rounded-md border border-gray-500 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={(input) => setStatechoiceOfDrink(input.target.value)}
        >
          {drinkList.map((data) => { return (<option>{data}</option>)})}
        </select>
      </div>
                    {/*  */}
        <p className='p'>{age}</p>
        <input
        defaultValue={stateAge}
          type="number"
          name="age"
          onChange={(number) => 
            setStateAge(number.target.value)
            }  
          id="age"
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {/*  */}
        <p className='p'>{temperature}</p>
        <input
        defaultValue={stateTemperature}
          type="number"
          name="temperature"
          onChange={(number) => setStateTemperature(number.target.value)}  
          id="temperature"
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className='p'>{gender}</p>
        <select
        defaultValue={stateGender}
          id="gender"
          name="gender"
          autoComplete="gender"
          className="mt-1 block w-full rounded-md border border-gray-500 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={(input) => setStateGender(input.target.value) }
        >
          {selectGender.map((data) => {
            return (
              <option>{data}</option>
            )
          })}
        </select>

        <p className='p'>{sensitive}</p>
        <select
        defaultValue={stateSensitive}
          id="sensitive"
          name="sensitive"
          autoComplete="sensitive"
          className="mt-1 block w-full rounded-md border border-gray-500 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={(input) => setStateSensitive(input.target.value) }
        >
          {selectSensitive.map((data) => {
            return (
              <option key={data.name}>{data}</option>
            )
          })}
        </select>
        <p className='p'>{times}</p>
        <select
        defaultValue={stateTimeofDay}
                        id="timeofDay"
                        name="timeofDay"
                        autoComplete="timeofDay"
                        className="mt-1 block w-full rounded-md border border-gray-500 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={(input) => setStateTimeofDay(input.target.value) }
        >
                        {selectTIme.map((data) => {
                          return (
                            <option key={data.name}>{data}</option>
                          )
                        })}
                      </select>
        <p className='p'>{preg}</p>
        <select
        defaultValue={statePregnant}
              id="pregnant"
              name="pregnant"
              autoComplete="preg"
              className="mt-1 block w-full rounded-md border border-gray-500 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              onChange={(input) => setStatePregnant(input.target.value) }
           >
            {selectPreg.map((data) => {
              return (
                <option key={data.name}>{data}</option>
              )
            })}
          </select>
        <p className='p'>{health}</p>
        <select
        defaultValue={stateHealth}
              id="health"
              name="health"
              autoComplete="selectHealth"
              onChange={(input) => setStateHealth(input.target.value) }
              className="mt-1 block w-full rounded-md border border-gray-500 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              {selectHealth.map((data) => {
                return (
                  <option >{data}</option>
                )
              })}
            </select>
        <p className='p'>{drinkPerday}</p>
        <input
        defaultValue={stateConsumePerDay}
          type="number"
          name="consumePerDay"
          onChange={(number) => setStateConsumePerDay(number.target.value)}  
          id="consumePerDay"
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />

        <p className='p'>{drinkToday}</p>
        <input
          type="number"
          defaultValue={stateConsumeToday}
          name="consumeToday"
          onChange={(number) =>setStateConsumeToday(number.target.value)}  
          id="consumeToday"
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </header>
      <div style={{height: 20, verticalAlign:10}}>
          <button className='submit-button' onClick={() => sendDrinkDetails()}>submit</button>
      </div>
      </div>
    </div>
  );
}

export default App;
