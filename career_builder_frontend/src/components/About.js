import  {useEffect} from 'react';
function About(){
    useEffect(()=>{
        document.title='About Us';
    });
    return(
        <h2>About us Page</h2>
    );

}
export default About;
