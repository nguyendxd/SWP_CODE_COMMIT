import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Sidebar from '../sidebar';
import cut from '../../../constant/cut.png';
import color from '../../../constant/color.png';
import clarity from '../../../constant/clarity.png';
import weight from '../../../constant/weigth.png';
import shape from '../../../constant/shape.png';
import certificate from '../../../constant/certification.png';

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
};

const FourCsContent = () => {
    return (
        <Container maxWidth={false} style={{ backgroundColor: 'white', paddingTop: '1%', paddingBottom: '2%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '25%' }}>
                    <Sidebar />
                </div>
                <div style={{ width: '75%', paddingLeft: '5%' }}>
                    <Typography variant="h4" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                        The 4Cs Of Diamonds
                    </Typography>
                    <hr style={{ backgroundColor: 'black', height: '4px' }} />
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                        Understanding a diamond's quality characteristics is key to finding the right diamond for you. Learn about the 4Cs of diamonds — cut, color, clarity, and carat weight.
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="The 4Cs"
                                        height="300"
                                        image={certificate}
                                    />
                                </Grid>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>The 4Cs</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        The 4Cs are the globally accepted standards for assessing the quality of a diamond. These standards include Cut, Color, Clarity, and Carat Weight. Learn more about each of these characteristics to make an informed decision when buying a diamond.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Cut"
                                        height="200"
                                        image={cut}
                                    />
                                </Grid>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Cut</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        The cut of a diamond determines its brilliance. A well-cut diamond reflects light beautifully and looks stunning.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Color"
                                        height="200"
                                        image={color}
                                    />
                                </Grid>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Color</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        The color of a diamond ranges from clear to yellowish. The less color in a diamond, the higher its value.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Clarity"
                                        height="200"
                                        image={clarity}
                                    />
                                </Grid>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Clarity</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Clarity refers to the absence of inclusions and blemishes in a diamond. Diamonds with fewer inclusions are rarer and more valuable.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Carat"
                                        height="200"
                                        image={weight}
                                    /></Grid>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Carat</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Carat weight measures the size of a diamond. Larger diamonds are more rare and valuable.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Carat"
                                        height="200"
                                        image={shape}
                                    /></Grid>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Shape</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Though not one of the 4Cs, shape is still an important
                                        factor to consider when buying a diamond.
                                        Each shape has different attributes
                                        that can affect price and quality grades.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
};

export default FourCsContent;
