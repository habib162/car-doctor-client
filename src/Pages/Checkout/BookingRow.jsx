const BookingRow = ({booking, handleDelete, handleConfirm}) => {
    const {customerName, email, date,service,price, img, _id, status } = booking;


    return (
        <tr>
            <th>
                <button className="btn btn-sm bg-black text-white rounded-full" onClick={() => handleDelete(_id)}>
                    X
                </button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                           {
                            img &&  <img src={img} alt={service} />
                           }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{service}</div>
                    </div>
                </div>
            </td>
            <td>
                {customerName}
               
            </td>
            <td>
                {email}
               
            </td>
            <td>${price}</td>
            <td>{date}</td>
            <th>
                {   status === 'confirm' ? <span className="font-bold text-primary"> confirmed</span> : 
                    <button onClick={() =>handleConfirm(_id)} className="btn btn-ghost btn-xs">Confirm</button>
                }
            </th>
        </tr>
    );
}

export default BookingRow;