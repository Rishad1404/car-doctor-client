import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Checkout = () => {
    const service = useLoaderData();
    const { title, _id, price,img } = service
    const {user}=useContext(AuthContext)

    const handleCheckoutService=e=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const date=form.date.value;
        const email=user?.email;
        const order={
            customerName:name,
            img,
            date,
            email,
            service_id:_id,
            service:title,
            price:price
        }
        console.log(order)
        fetch('http://localhost:5000/bookings',{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId){
                alert('Service Booked Successfully')
            }
        })

    }
    return (
        <div>
            <h2 className="text-3xl text-center" >Book Service: {title}</h2>
            <div className="hero bg-base-200 my-10">
                <div className="w-full">
                        <form onSubmit={handleCheckoutService} className="card-body">
                            <div className="lg:flex gap-5 w-full mb-5">
                                <div className="form-control w-1/2">
                                    <input type="text" name="name" placeholder="Name" className="input " required />
                                </div>
                                <div className="form-control w-1/2">
                                    <input type="date"name="date" placeholder="Data" className="input" required />
                                </div>
                            </div>
                            <div className="lg:flex gap-5 mb-5">
                                <div className="form-control w-1/2">
                                    <input type="email"  defaultValue={user?.email} className="input " required />
                                </div>
                                <div className="form-control w-1/2">
                                    <input type="text"defaultValue={"$"+ price}  className="input " required />
                                </div>
                            </div>
                            <textarea className="border p-3" placeholder="Your Message" name="" id="" cols="30" rows="10"></textarea>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn bg-orange-600 text-white">Order Confirm</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;