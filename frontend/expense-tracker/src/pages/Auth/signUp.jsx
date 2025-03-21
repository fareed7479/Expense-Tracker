import {React,useState }from 'react'
import {useNavigate} from 'react-router-dom'
import Input from '../../components/inputs/Input'
import {Link} from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../../src/context/UserContext'
import uploadImage from '../../utils/uploadimage'
import { useContext } from 'react'

const signUp = () => {
  const [profilePic,setProfilePic] = useState(null);
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const [error,setError] = useState(null); 

  const navigate = useNavigate();

  const {updateUser} = useContext(UserContext);


  //Handle SignUp Form Submit
  const handleSignUp  = async(e) => {
      e.preventDefault();

      let profileImageUrl = "";
      if(!fullName){
        setError("Please enter Your name.");
        return;
      }

      if(!validateEmail(email)){
        setError("Please enter a valid email address.");
        return;
      }

      if(!password){
        setError("Please enter a valid password");
        return;
      }

      setError("");

      //SignUp API Call

      try {

          //upload image if present
          if(profilePic) {
            const imgUploadRes = await uploadImage(profilePic);
            profileImageUrl = imgUploadRes.imageUrl || "";
          }


        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          fullName,
          email,
          password,
          profileImageUrl,
        });


        const {token ,user } = response.data;

        if(token) {
          localStorage.setItem("token",token);
          updateUser(user);
          navigate("/dashboard");
        }
      }
      catch (err) {
        if(err.response && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong.PLease try again later.");
        }
      }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6"> Join us today by entering Your Details Below.</p>

        <form action="" onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({target})=> setFullName(target.value)}
              label="FullName"
              placeholder="John"
              type = "text"
              />
            <Input 
              type="text" 
              value={email} 
              onChange={({target}) => setEmail(target.value)}
              label="Email Address"
              placeholder='John@example.com'
              />
            <div className="col-span-2"> 
            <Input 
              type="password" 
              value={password} 
              onChange={({target}) => setPassword(target.value)}
              label="password"
              placeholder='Minimum 8 Characters req'
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}       
                    <button type='submit' className='btn-primary'>
                      SIGN UP
                    </button>
          
                    <p className='text-[13px] text-slate-800 mt-3'>
                      Already Have an Account?{""}
                      <Link className='font-medium text-primary underline' to='/login'>
                        Login
                      </Link>
                    </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default signUp