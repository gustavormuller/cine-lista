import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import './Reviews.css';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [])

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try {
            const response = await api.post("https://movie-api-y7v7.onrender.com/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });
            const updatedReviews = [...(reviews || []), { body: rev.value }];
            rev.value = "";
            setReviews(updatedReviews);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3 className="review-title">Resenhas</h3></Col>
            </Row>
            <Row className="review-body">
                <Col className="review-img-div">
                    <img src={movie?.poster} alt="Poster do filme" className="review-img" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Escreva uma resenha" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col className="responsive-hr">
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews