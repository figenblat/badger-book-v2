
const Student = (props) => {

    
    let listArr = []
    for(let i = 0; i < props.interests.length; i++){
        listArr.push(<li key = {props.interests[i]}>{props.interests[i]}</li>)
    }


    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {/* TODO Student data goes here! */}
        <h6>Majoring in: {props.major}</h6>
        <h6>Enrolled in {props.numCredits} credits</h6>
        <h6>From Wisconsin: {props.fromWisconsin.toString()}</h6>
        <h6>{props.interests.length} interests:</h6>
        <ul> {listArr} </ul>
    </div>

    
}

export default Student;