import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Cart({ cart, setCart }) {
    // const user = JSON.parse(localStorage.getItem('user'));
    const totalPrice = cart.reduce((acc, el) => acc + el.quantity * el.price, 0);
    const navigate = useNavigate();

    const cartQuantity = cart.reduce((acc, el) => {
        return acc + el.quantity;
    }, 0);

    const handleIncrement = (id) => {
        const newCart = cart.map((item) => item.id === id
            ? { ...item, quantity: item.quantity === item.stock ? item.quantity : item.quantity + 1 }
            : item
        )
        setCart(newCart)
    };

    const handleDecrement = (id) => {
        const newCart = cart.map((item) => item.quantity > 0 && item.id === id
            ? Boolean(item.quantity - 1) && { ...item, quantity: item.quantity - 1 }
            : item
        ).filter((e) => e !== false)
        setCart(newCart)
    };

    const handleRemove = (id) => {
        const newCart = cart.filter((e) => e.id !== id)
        setCart(newCart);
    };

    // const buyFunction = async () => {
    //     try {
    //         const response = await axios.post('/payment', cart);
    //         await setCart([])
    //         window.location.href = response.data.response.body.init_point;
    //     } catch (error) { console.log(error) }
    // }

    return cart.length < 1 ? (
        <div className="flex flex-col items-center mt-4">
            <h2 className="text-center">Tu carrito está vacío</h2>
            <p>¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
            <button
                onClick={() => navigate("/home")}
                className="flex items-center justify-center m-4 p-4 w-72 rounded-md bg-primary-500 text-bg-stone-100 font-bold text-base cursor-pointer transition duration-200 hover:bg-primary-400"
            >
                Descubrir ofertas
            </button>
        </div>
    ) : (
        <div className="grid grid-cols-3">
            <div className="col-span-2">
                {cart?.map((product) => {
                    return (
                        <div className="m-3 bg-red-800 rounded-md grid grid-cols-5 items-center p-10 h-120px shadow-md" key={product.id}>
                            <img src={product.image} alt={product.name}></img>

                            <div className="{productName}">{product.name}</div>

                            <div className="text-22px font-normal text-#202020">${product.price}</div>


                            <div className="w-10 flex justify-between font-heading items-center">
                                <button
                                    className="flex justify-center items-center bg-transparent font-bold hover:bg-amber-400 text-amber-500 text-2xl text-center hover:text-stone-950 py-1 px-4 border border-amber-400 hover:border-transparent rounded"
                                    onClick={() => handleDecrement(product.id)}
                                >
                                    <span className="flex items-center justify-center h-full pb-1">-</span>
                                </button>
                                <div className="mx-4 text-center">{product.quantity}</div>
                                <button
                                    className="flex justify-center items-center bg-transparent font-bold hover:bg-amber-400 text-amber-500 text-2xl text-center hover:text-stone-950 py-1 px-4 border border-amber-400 hover:border-transparent rounded"
                                    onClick={() => handleIncrement(product.id)}
                                >
                                    <span className="flex items-center justify-center h-full pb-1">+</span>
                                </button>
                            </div>

                            <div>
                                <button
                                    className="ml-10 h-12 bg-transparent hover:bg-amber-400 text-amber-500 font-semibold hover:text-stone-950 py-2 px-3.5 border border-amber-400 hover:border-transparent rounded"
                                    onClick={() => handleRemove(product.id)}
                                >
                                    Quitar
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-96 h-72 bg-red-800 rounded-md flex flex-col justify-center items-center m-3 p-15 shadow-md">

                <span className="text-center">
                    NRO DE ORDEN: PONER ORDER NUMBER
                </span>

                <h2 className="text-2xl m-3 font-bold">USER NAME</h2>

                    <p className="text-center m-2"> Artículos: {cartQuantity}</p>
                <p className="text-center m-2">
                        Envió: <span>Gratis!</span>
                </p>


                <div className="text-center m-3 font-bold text-3xl">
                    <span>PRECIO TOTAL: ${totalPrice}</span>
                </div>

                <div className="mt-auto">
                    {/* <div>
                        <SignUp trigger={triggerPopUpSignUp} setTrigger={setTriggerPopUpSignUp} setLoginTrigger={setTriggerPopUp} />
                    </div>
                    <div>
                        <Login trigger={triggerPopUp} setTrigger={setTriggerPopUp} setTriggerSignUp={setTriggerPopUpSignUp} setHasLogged={setHasLogged} hasLogged={hasLogged} />
                    </div> */}
                    <button
                        className="mb-5 h-12 bg-transparent hover:bg-amber-400 text-amber-500 font-semibold hover:text-stone-950 py-2 px-3.5 border border-amber-400 hover:border-transparent rounded"
                    // onClick={user ? () => buyFunction() : () => setTriggerPopUp(true)}
                    >
                            {/* {user ? "COMPRAR" : "REGÍSTRATE!"} */} COMPRAR
                    </button>
                </div>
            </div>
        </div >
    );
}
Cart.propTypes = { cart: PropTypes.array, setCart: PropTypes.func };
export default Cart;
