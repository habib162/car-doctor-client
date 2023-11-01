import BreadcrumpImg from "../../../assets/images/checkout/checkout.png";
const Breadcrump = () => {
    return (
        <div className="hero h-[300px] w-full rounded-lg relative" style={{ backgroundImage: `url(${BreadcrumpImg})` }}>
            <div className="hero-overlay bg-opacity-60 rounded-lg bg-gradient-to-r  left-0 bottom-0 from-[#151515] to-[rgba(21, 21, 21, 0.00)]"></div>
            <div className="hero-content text-center text-neutral-content">

                <h1 className="mb-5 text-5xl font-bold mr-[48rem]">Check Out</h1>
            </div>
            <div className="absolute w-full flex justify-center items-end bottom-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="296" height="50" viewBox="0 0 296 50" fill="none">
                    <path d="M296 49.3H0L27.8 0H268.3L296 49.3Z" fill="#FF3811" />
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="20">Home/checkout</text>
                </svg>
            </div>
        </div>

    );
}

export default Breadcrump;