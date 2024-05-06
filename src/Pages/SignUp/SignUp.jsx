import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';


const SignUp = () => {

    const {createUser}=useContext(AuthContext)

    const handleSignUp = e => {
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        console.log(name,email,password)

        createUser(email,password)
        .then(result=>{
            const user=result.user
            console.log(user)
        })
        .then(error=>console.log(error))
    }
    return (
        <div className="hero mb-20">
        <div className="hero-content flex-col lg:flex-row">
            <div className="text-center mr-12 w-1/2">
                <img src={img} alt="" />
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSignUp} className="card-body">
                    <h1 className="text-5xl font-bold text-center">Sign Up</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
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
                            <span className="label-text">Confirm Password Password</span>
                        </label>
                        <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-orange-600 text-white font-bold">Sign up</button>
                        <p className='text-center mt-4'>Already have an account <Link to='/login' className='text-orange-600 font-bold'>Login</Link></p>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
    );
};

export default SignUp;