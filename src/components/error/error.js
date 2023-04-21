import img from './error.gif'

const Error = () =>{
    return(
        <img src={img} alt="error" style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }}/>
    )
}

export default Error;