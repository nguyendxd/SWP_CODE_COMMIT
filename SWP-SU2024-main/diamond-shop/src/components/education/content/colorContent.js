import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Sidebar from '../sidebar';
import diamondColor from '../../../constant/colorDiamond.png'

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
};

const ColorEducation = () => {
    return (
        <Container maxWidth={false} style={{ backgroundColor: 'white', paddingTop: '1%', paddingBottom: '2%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '25%' }}>
                    <Sidebar />
                </div>
                <div style={{ width: '75%', paddingLeft: '5%' }}>
                    <Typography variant="h4" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                        Diamond Color
                    </Typography>
                    <hr style={{ backgroundColor: 'black', height: '4px' }} />
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                        Diamond color is a key factor in determining a diamond's value. Learn about diamond color grades and how they affect the appearance and value of a diamond.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <span style={{ fontWeight: 'bold' }}>Diamond color</span> refers to the absence of color in a diamond. The less color, the higher the grade. The highest quality diamonds are colorless, while lower quality diamonds can have a slight yellow or brown tint.
                    </Typography>
                    <Typography variant="h6" gutterBottom style={{ textAlign: 'left', color: '#1a237e', marginTop: '2%' }}>
                        Understanding Diamond Color
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                        The Gemological Institute of America (GIA) grades diamond color on a scale from D (colorless) to Z (light yellow or brown). Here is a breakdown of the color grades:
                    </Typography>
                    <Typography variant="body1" style={{ textAlign: 'left', marginBottom: '2%' }}>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li><b>D-F:</b> Colorless. These are the most valuable and rare diamonds.</li>
                            <li><b>G-J:</b> Near-colorless. These diamonds appear colorless to the untrained eye and offer excellent value.</li>
                            <li><b>K-M:</b> Faint color. These diamonds have a slight yellow tint, visible to the naked eye.</li>
                            <li><b>N-R:</b> Very light color. These diamonds have a noticeable yellow or brown tint.</li>
                            <li><b>S-Z:</b> Light color. These diamonds have an obvious yellow or brown tint.</li>
                        </ul>
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={9}>
                                    <CardMedia
                                        component="img"
                                        alt="Diamond Color Scale"
                                        height="350"
                                        width="600"
                                        image={diamondColor}
                                    />
                                </Grid>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Diamond Color Scale</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        The GIA color scale is the industry standard for assessing diamond color. The scale ranges from D (colorless) to Z (light color).
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Colorless Diamonds</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Colorless diamonds (D-F) are the most prized for their rarity and value. They exhibit no color and appear icy white.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Near-Colorless Diamonds</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Near-colorless diamonds (G-J) offer great value as they appear colorless to the untrained eye, with only slight traces of color.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Faint Color Diamonds</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Faint color diamonds (K-M) have a slight yellow tint, visible to the naked eye. They are more affordable and offer a warm appearance.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Light Color Diamonds</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Light color diamonds (N-R) have a noticeable yellow or brown tint. They are more affordable and offer a unique look.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Obvious Color Diamonds</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Obvious color diamonds (S-Z) have an obvious yellow or brown tint. They are the most affordable and offer a distinctive appearance.
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

export default ColorEducation;
