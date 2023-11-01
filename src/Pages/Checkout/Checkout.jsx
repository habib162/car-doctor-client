import { useLoaderData } from "react-router-dom";
import Breadcrump from "../Shared/Breadcrump/Breadcrump";
import UseAuth from "../../hooks/UseAuth";
// import { AuthContext } from "../../providers/AuthProvider";
// import { useContext } from "react";

const Checkout = () => {

    const service = useLoaderData();
    const { title, _id, price, img} = service;
    const {user} = UseAuth();

    const submitCheckout = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const phone = form.phone.value;
        const email = user?.email;
        const message = form.message.value;
        const order = {
            customerName : name,
            email,
            date,
            service: title,
            service_id: _id,
            price: price,
            img,
            phone,
            message

        }
        fetch('http://localhost:5000/checkouts',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })

    }
    return (
        <div>
            <Breadcrump></Breadcrump>
            <div className="h-[700px] my-10 bg-base-200 rounded-lg ">
                <div className="flex-col lg:flex-row py-10">
                    <div className="w-[24rem] lg:w-[48rem] mx-auto my-10  bg-base-200">
                        <form onSubmit={submitCheckout}>
                            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" name='name'defaultValue={user?.displayName} placeholder="Full Name" className="input input-bordered  focus:outline-none focus:border-[#FF3811]" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Date</span>
                                    </label>
                                    <input type="date" name='date' placeholder="Date" className="input input-bordered  focus:outline-none focus:border-[#FF3811]" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Phone</span>
                                    </label>
                                    <input type="text" name='phone' placeholder="Your Phone" className="input input-bordered  focus:outline-none focus:border-[#FF3811]" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Email</span>
                                    </label>
                                    <input type="email" name='email' defaultValue={user?.email} placeholder="Your Email" className="input input-bordered  focus:outline-none focus:border-[#FF3811]" required />
                                </div>
                            </div>
                            <div className="mb-6 col-span-2">
                                <label className="label">
                                    <span className="label-text">Your Message</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Your Message"
                                    className="w-full input input-bordered  focus:outline-none focus:border-[#FF3811] rounded-md py-2 px-4 block appearance-none leading-normal resize-none" required
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <input className='btn btn-primary bg-[#FF3811] hover:bg-[#FF3811] text-white outline-none' type='submit' value="Order Confirm"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Checkout;