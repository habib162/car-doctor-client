import { Link } from 'react-router-dom';
import loginImg from '../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';


const SignUp = () => {
    const { createUser } = useContext(AuthContext);

    const handleSignUp = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!/\S+@\S+\.\S+/.test(email)) {
            console.log('Invalid email format');
            return;
        }

        createUser(name, email, password)
            .then((res) => {
                const user = res.user;
                console.log(user);
            })
            .catch((error) => console.log(error));
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-1/2 mr-12">
                    <img src={loginImg}></img>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl text-center font-bold mt-4">Sign Up</h1>
                    <form className="card-body" onSubmit={handleSignUp}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                        </div>
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
                            <input className='btn btn-primary' type='submit' value="Sign Up"></input>
                        </div>
                    </form>
                    <p className='my-4 text-center'>Already Have an account ? <Link to="/login" className='text-orange-600 font-bold'>Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;