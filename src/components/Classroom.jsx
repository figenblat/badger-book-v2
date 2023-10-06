import { Button, Container, Form, Row, Col} from "react-bootstrap";
import { useState, useEffect } from 'react';
import Student from "./Student";
import Pagination from 'react-bootstrap/Pagination';


  const Classroom = () => {
   
    
    let numStudents = 0;
    const[students, setStudents] = useState([]);
    const[inputName, setInputName] = useState("");
    const[inputMajor, setInputMajor] = useState("");
    const[inputInterest, setInputInterest] = useState("");
    const[shownStudents, setShownStudents] = useState([]);
    const [activePage, setActivePage] = useState(1);


    useEffect(()=>{
        fetch("https://cs571.org/api/f23/hw4/students", {
        method: "GET",
        headers: {
            "X-CS571-ID": CS571.getBadgerId()
        }
     })
        .then(response => response.json())
        .then(data => {
            setStudents(data)
            setShownStudents(data)
        })
    },[])
        console.log(students);
        numStudents = students.length;

    
    const buildPaginator =() => {
        let pages =[]

        pages.push(
            <Pagination.First
            
            active = {activePage === 1}
            onClick={()=>setActivePage(1)}
            />
        )
        pages.push(
            <Pagination.Prev
            disabled ={activePage === 1 || numStudents===0}
            active={activePage === activePage - 1}
            onClick={()=> setActivePage(activePage-1)}
            >
               Previous
            </Pagination.Prev>
        )


        const num_pages = Math.ceil(shownStudents.length/24)
        for(let i = 1; i <= num_pages; i++){
            pages.push(
                <Pagination.Item
                key={i}
                active= {activePage === i}
                onClick={()=>setActivePage(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }

        pages.push(
            <Pagination.Next
            disabled = {activePage === num_pages || numStudents === 0}
            active={activePage === activePage + 1}
            onClick={()=> setActivePage(activePage+1)}
            >
                Next 
            </Pagination.Next>
        )
        pages.push(
            <Pagination.Last
            active={activePage === num_pages}
            onClick={()=> setActivePage(num_pages)}
            />
        )
        return pages;

    }



    useEffect(() => {
        console.log("inputName, inputMajor, or inputInterest changed!");
        filterStudents();
        }, [inputName, inputMajor, inputInterest]);


    useEffect(() => {
        console.log("shownStudents changed!");
        console.log(shownStudents);
        }, [shownStudents]);


    function filterStudents(){
        let filteredStudents =[];


        for(let i = 0; i < students.length; i++){

            /*
            TODO
            need to make sure can search by name with space between first and last
            need to also make sure to trim all my searches 
            */
            // just searching by name 
            if(inputName != "" && inputMajor === "" && inputInterest ===""){
                if(students[i].name.first.toLowerCase().includes(inputName) || students[i].name.last.toLowerCase().includes(inputName)){
                    filteredStudents.push(students[i])
                   }
            }

            // just searching by major 
            else if(inputName === "" && inputMajor != "" && inputInterest ===""){
                if(students[i].major.toLowerCase().includes(inputMajor)){
                    filteredStudents.push(students[i])
                }

            }

            // just searching by interest 
            else if(inputName === "" && inputMajor === "" && inputInterest !=""){
                for(let j = 0; j<students[i].interests.length; j++){
                    if(students[i].interests[j].toLowerCase().includes(inputInterest)){
                        filteredStudents.push(students[i])
                        break;
                    }

                }

            }

            //  searching by name and major 
            else if(inputName != "" && inputMajor != "" && inputInterest === ""){
                if(students[i].major.toLowerCase().includes(inputMajor) && (students[i].name.first.toLowerCase().includes(inputName) || students[i].name.last.toLowerCase().includes(inputName))){
                    filteredStudents.push(students[i])
                }
            }

            // searching by name and interest 
            else if(inputName != "" && inputMajor === "" && inputInterest != ""){
                if(students[i].name.first.toLowerCase().includes(inputName) || students[i].name.last.toLowerCase().includes(inputName)){
                    for(let j = 0; j < students[i].interests.length; j++){
                        if(students[i].interests[j].toLowerCase().includes(inputInterest)){
                            filteredStudents.push(students[i]);
                        }
                    }
                }
            }

            // searching by major and interest 
            else if(inputName === "" && inputMajor != "" && inputInterest != "" ){
                if(students[i].major.toLowerCase().includes(inputMajor)){
                    for(let j = 0; j < students[i].interests.length; j++){
                        if(students[i].interests[j].toLowerCase().includes(inputInterest)){
                            filteredStudents.push(students[i])
                        }
                    }
                }
            }

            // searching by name, major, and interest 
            else if(inputName != "" && inputMajor != "" && inputInterest != "" ){
                if(students[i].major.toLowerCase().includes(inputMajor) && (students[i].name.first.toLowerCase().includes(inputName) || students[i].name.last.toLowerCase().includes(inputName))){
                    for(let j = 0; j < students[i].interests.length; j++){
                        if(students[i].interests[j].toLowerCase().includes(inputInterest)){
                            filteredStudents.push(students[i])
                        }
                    }
                }
            }
            else if(inputName ==="" && inputMajor === "" && inputInterest ===""){
                filteredStudents.push(students[i])
            }
         }

         

        
        setShownStudents(filteredStudents);
        
        
    }

    numStudents = shownStudents.length;


    function resets(){
        setShownStudents(students)
        numStudents = students.length;
    }
    

    
   
    return <div>
        <h1>Badger Book - Fall 2023</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control 
            id="searchName"
            value ={inputName}
            onChange={(e) => setInputName(e.target.value.toLowerCase())}
            />

            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control 
            id="searchMajor"
            value ={inputMajor}
            onChange={(e) => setInputMajor(e.target.value.toLowerCase())}  
            />

            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control 
            id="searchInterest"
            value ={inputInterest}
            onChange={(e) => setInputInterest(e.target.value.toLowerCase())}
            />

            <br />
            <Button variant="neutral" onClick={resets}>Reset Search</Button>
        </Form>

        <p> There are {numStudents} student(s) matching your search.</p>
        
        <Container fluid>
            <Row> 
                { /* TODO Students go here! */ }
                {
                   shownStudents.slice((activePage - 1) * 24, activePage*24).map(studs => <Col key={studs.id} xs={12} sm={6} md={4} lg={3} xl={2}><Student {...studs}/></Col>)
                }
            </Row>
        </Container>
        <br/>
        <Pagination>
            {buildPaginator()}
        </Pagination>
            
    </div>

    

}



export default Classroom;