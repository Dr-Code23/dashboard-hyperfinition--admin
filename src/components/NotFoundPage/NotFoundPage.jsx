import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
    let navigate = useNavigate();
    return (
        <>
            <div className="NotFoundPage">
                <section className="page_404">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="col-sm-10 col-sm-offset-1  text-center w-100">
                                    <div className="four_zero_four_bg">
                                        <h1 className="text-center ">404</h1>
                                    </div>

                                    <div className="contant_box_404">
                                        {/* <h3 className="h2">يبدو أنك تائه</h3>

                                        <p>الصفحة التي تبحث عنها غير متوفرة!</p> */}

                                        <h4
                                            href=""
                                            className="link_404"
                                            onClick={() => navigate("/")}
                                        >
                                            Home
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default NotFoundPage;
