import React, {useState, useEffect} from 'react';


function DropDown(props) {

    const [textToSearch, setTextToSearch] = useState('');
    const [filteredIssues, setIssues] = useState([]);
    const [counterKey, setCounterKey] = useState(0);


    const searchIssues = async (textToSearch) => {
        


        setTextToSearch(textToSearch);
        if(textToSearch == ''){
            setIssues([]);
        }

        if(textToSearch !== undefined  && parseInt(textToSearch.length) >= parseInt(props.textSizeMin)){

            let dataToFind =  textToSearch.trim();
            let responseData = await fetch('https://api.github.com/repos/facebook/react/issues',{
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.v3+json'
                }
            })
            .then( response => response.json())
            .then( jsonResponse => {
              

                return jsonResponse.filter( (data) => {

                    return (data.pull_request == undefined) && ( data.title.search( new RegExp(dataToFind, "i") ) !== -1 || data.body.search( new RegExp(dataToFind, "i") ) !== -1 );

                }).map( (issues) => {


                    return issues.title;
                    

                });


            });

         
            setIssues(responseData);

        }

    }

    const pressKey = (e) =>{

        if(filteredIssues && filteredIssues.length > 0) {
            if(e.keyCode === 38){

                setCounterKey( prev => prev - 1);

        } else if(e.keyCode === 40){
            
                setCounterKey( prev => prev + 1);
        
            }
        }
       
       
      
    }
    


    return ( 
           <form autoComplete="off">
                <input type="search" autoComplete="off" value={textToSearch} onKeyDown={e => pressKey(e)} onChange={ e => searchIssues(e.target.value)} id="Search" />
                {
                    <ul className="autocomplete-issues">
                    {filteredIssues.map((issue, index) => {
            
                        if(counterKey === index){
                           
                            return (
                                <li style={{backgroundColor: "#CCCCCC", color: 'white' }}  key={issue}>
                                      {issue}
                                </li>
                              );

                        } else {
                            return (
                                <li  key={issue}>
                                  {issue} 
                                </li>
                            );
                        }
                    
                    })}
                  </ul>
                }
           </form>
            
    );

    

}


export default DropDown;