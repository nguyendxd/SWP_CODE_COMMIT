import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Sidebar from '../sidebar';
import platinum from '../../../constant/Platinum.png';
import gold from '../../../constant/Gold.png';
import silver from '../../../constant/Silver.png';
import tungstenCarbide from '../../../constant/Tungsten Carbide.png';
import titanium from '../../../constant/Titanium.png';
import cobalt from '../../../constant/Cobalt.png';
import tantalum from '../../../constant/Tantalum.png';

const cardStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: '20px',
};

const MetalEducation = () => {
    return (
        <Container maxWidth={false} style={{ backgroundColor: 'white', paddingTop: '1%', paddingBottom: '2%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '25%' }}>
                    <Sidebar />
                </div>
                <div style={{ width: '75%', paddingLeft: '5%' }}>
                    <Typography variant="h4" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                        Metal Education
                    </Typography>
                    <hr style={{ backgroundColor: 'black', height: '4px' }} />
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                        At Blue Nile, our jewelry is crafted with only the finest materials, ensuring you a lifetime of value. Learn more about the variety of metals we offer to find the one that is right for you.
                    </Typography>
                    
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Platinum"
                                        height="200"
                                        image={platinum}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9} md={9}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Platinum</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Our most popular metal for engagement rings and wedding bands, platinum's naturally white sheen will never fade or change color, and accentuates the sparkle and brilliance of a diamond. Platinum will last forever, making it the ultimate symbol for true, enduring, and everlasting love.
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Gold"
                                        height="200"
                                        image={gold}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9} md={9}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Gold</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Gold has an extraordinary heritage with unique qualities. As an enduring element found naturally in a distinct yellow color, gold is resistant to rust, tarnish, and corrosion. Although gold is very strong, it's also the most malleable of all precious metals.
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Silver"
                                        height="200"
                                        image={silver}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9} md={9}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Silver</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            The silver jewelry and accessories available at Blue Nile are made of beautiful sterling silver. For our collection, we have chosen classic designs created by some of the finest craftsmen. This guide will help you learn to identify quality in silver jewelry and accessories.
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Tungsten Carbide"
                                        height="200"
                                        image={tungstenCarbide}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9} md={9}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Tungsten Carbide</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Unique in appeal and strong by design, tungsten carbide is a forged metal with qualities that will last a lifetime. Tungsten carbide jewelry is created from an alloy of 80% elemental Tungsten and 20% Carbon alloyed with other metals.
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Cobalt"
                                        height="200"
                                        image={cobalt}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9} md={9}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Cobalt</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Made from a highly durable alloy, cobalt is four times harder than platinum while at the same time, less dense. Because of its natural hardness, cobalt jewelry is extremely scratch, chip and corrosion-resistant. Its lower density and natural malleability allow for strong, dynamic designs with less weight. Cobalt is also hypoallergenic, making it an ideal choice for those with sensitive skin or an active lifestyle.
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Titanium"
                                        height="200"
                                        image={titanium}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9} md={9}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Titanium</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Long-lasting, strong and durable—titanium is one of the toughest metals on earth. Titanium has a natural silver-grey tint, but through the process of anodization can be treated to form a variety of colors. More lightweight than gold or silver and hypoallergenic, titanium is easy to wear and a superb choice for men's wedding rings.
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <CardMedia
                                        component="img"
                                        alt="Tantalum"
                                        height="200"
                                        image={tantalum}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9} md={9}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Tantalum</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Tantalum is the newest addition to our contemporary metals, and is highly scratch-resistant and hypoallergenic. Naturally a blue-gray metal, our tantalum is 99% pure and coated with a ceramic glaze that gives the metal a matte black finish. It is important to note that Blue Nile only carries conflict-free tantalum processed in non-conflict mines and production facilities.
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
};

export default MetalEducation;
