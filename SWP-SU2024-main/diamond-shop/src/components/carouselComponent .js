import React, { useState } from 'react';
import styled from 'styled-components';
import len_y_tuong from '../constant/len-y-tuong.png'
import phac_thao from '../constant/phac-thao-thiet-ke.png'
import che_tac from '../constant/che-tac-tan-tam.png'
import ky_vat from '../constant/ky-vat-mot-doi.png'
import { Container, Row, Col, Button } from 'react-bootstrap';

//mo cai file hoi nay

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding-top: 5%;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 80%;
  heigth: 'auto';
  max-width:100%;
  max-height: 100%;
  border-radius: 5px;
`;

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: #333;
  z-index: 1;
  ${props => props.left && `left: 0;`}
  ${props => props.right && `right: 0;`}
`;

const TextContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  max-width: 100%;
  width:70%;
`;

const CarouselComponent = () => {
    const images = [
        {
            src: len_y_tuong,
            text1: 'Generating Ideas',
            text2: 'Choose and create designs according to your own style. This could be a special idea in your love story, or perfect pieces from designs you have seen before.'
        },
        {
            src: phac_thao,
            text1: 'Design Sketch',
            text2: 'Sketch out ideas for your dream ring, creating highlights with more diverse materials or styles and a variety of colors. Feel free to choose the shape and size of the main stone according to the ring type, preference, and budget.'
        },
        {
            src: che_tac,
            text1: 'Craftsmanship with Dedication',
            text2: 'With skilled hands and dedication in each stage of crafting, the ring embodies understanding, love, and perfect precision, creating the most harmonious and sparkling design.'
        },
        {
            src: ky_vat,
            text1: 'A Lifetime Keepsake',
            text2: 'Believe that each ring is created for one and only owner, it is not just a simple piece of jewelry but also a declaration of personal value, a ring that carries a message of love to your other half!'
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Container className="mt-5">
            <Row className="align-items-center">
                <Col md={6}>
                    <CarouselContainer>
                        <ArrowButton left variant="light" onClick={handlePrev}>&lt;</ArrowButton>
                        <ImageContainer>
                            <Image src={images[currentIndex].src} alt="carousel" />
                        </ImageContainer>
                    </CarouselContainer>
                </Col>
                <Col md={6}>
                    <CarouselContainer>
                        <TextContainer>
                            <h4 style={{ textAlign: 'left' }}>
                                {images[currentIndex].text1}
                            </h4>
                            <p style={{ textAlign: 'left' }}>
                                {images[currentIndex].text2}
                            </p>
                        </TextContainer>
                        <ArrowButton right variant="light" onClick={handleNext}>&gt;</ArrowButton>
                    </CarouselContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default CarouselComponent;
