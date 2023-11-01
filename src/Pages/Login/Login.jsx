import { Link } from 'react-router-dom';
import loginImg from '../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';



const Login = () => {

    const {signIn} = useContext(AuthContext);
    const handleSignIn =(e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);
        signIn(email,password)
        .then(res =>{
            const user = res.user;
            console.log(user);
        })
        .catch(error => console.log(error))
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-1/2 mr-12">
                    <img src={loginImg}></img>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl text-center font-bold mt-4">Login</h1>
                    <form className="card-body" onSubmit={handleSignIn}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className='btn btn-primary' type='submit' value="Login"></input>
                        </div>
                    </form>
                    <p className='my-4 text-center'>New to Car Doctors <Link to="/signup" className='text-orange-600 font-bold'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;