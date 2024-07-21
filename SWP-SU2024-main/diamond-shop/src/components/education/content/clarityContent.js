import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Sidebar from '../sidebar';

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
};

const ClarityEducation = () => {
    return (
        <Container maxWidth={false} style={{ backgroundColor: 'white', paddingTop: '1%', paddingBottom: '2%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '25%' }}>
                    <Sidebar />
                </div>
                <div style={{ width: '75%', paddingLeft: '5%' }}>
                    <Typography variant="h4" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                        Diamond Clarity
                    </Typography>
                    <hr style={{ backgroundColor: 'black', height: '4px' }} />
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                        Diamond clarity refers to the absence of inclusions and blemishes. Learn how diamond clarity grades affect the appearance and value of a diamond.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'bold' }}>
                        Diamond Clarity
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Diamond clarity assesses the presence of internal inclusions and external blemishes. The fewer the inclusions and blemishes, the better the clarity grade.
                    </Typography>
                    <Typography variant="h6" gutterBottom style={{ textAlign: 'left', color: '#1a237e', marginTop: '2%' }}>
                        Understanding Diamond Clarity
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                        The Gemological Institute of America (GIA) grades diamond clarity on a scale from Flawless (FL) to Included (I). Here is a breakdown of the clarity grades:
                    </Typography>
                    <Typography variant="body1" style={{ textAlign: 'left', marginBottom: '2%' }}>
                        <ul>
                            <li><b>FL:</b> Flawless. No inclusions or blemishes visible under 10x magnification.</li>
                            <li><b>IF:</b> Internally Flawless. No inclusions visible under 10x magnification, only blemishes.</li>
                            <li><b>VVS1, VVS2:</b> Very, Very Slightly Included. Inclusions are difficult to see under 10x magnification.</li>
                            <li><b>VS1, VS2:</b> Very Slightly Included. Inclusions are minor and range from difficult to somewhat easy to see under 10x magnification.</li>
                            <li><b>SI1, SI2:</b> Slightly Included. Inclusions are noticeable under 10x magnification.</li>
                            <li><b>I1, I2, I3:</b> Included. Inclusions are obvious under 10x magnification and may affect transparency and brilliance.</li>
                        </ul>
                    </Typography>
                    <Typography variant="h4" style={{ textAlign: 'left', marginBottom: '2%' }}>
                        Diamond Clarity Spans 6 Categories With A Total Of 11 Clarity Grades
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        In 1953, Richard T. Liddicoat and colleagues established the Gemological Institute of America (GIA) diamond grading system and clarity scale. The GIA diamond grading scale is divided into 6 categories and 11 diamond clarity grades.
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Diamond Clarity Scale</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    The GIA clarity scale is the industry standard for assessing diamond clarity. The scale ranges from Flawless (FL) to Included (I).
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Included Diamonds (I1, I2, I3)</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <ul>
                                            <li>I clarity diamonds have obvious inclusions that are likely to be visible and impact beauty.</li>
                                            <li>Blue Nile does not sell I clarity grade loose diamonds for engagement ring designs.</li>
                                            <li>Blue Nile does offer a limited selection of jewelry preset with I1 diamonds.</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Slightly Included Diamonds (SI1, SI2)</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <ul>
                                            <li>Inclusions are noticeable at 10x magnification.</li>
                                            <li>If eye clean, SI diamonds are often the best value.</li>
                                            <li>SI2 inclusions may be detectable to a keen unaided eye, especially when viewed from the side.</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Very Slightly Included Diamonds (VS1, VS2)</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <ul>
                                            <li>Minor inclusions ranging from difficult (VS1) to somewhat easy (VS2) to see at 10x magnification.</li>
                                            <li>Great value; Blue Nile’s most popular diamond clarity.</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Very, Very Slightly Included Diamonds (VVS1, VVS2)</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <ul>
                                            <li>VVS diamonds have minuscule inclusions that are difficult even for trained eyes to see under 10x magnification.</li>
                                            <li>VVS clarity is rare and results in an eye clean appearance.</li>
                                            <li>Characteristics are minuscule and difficult to see under 10x magnification, even to a trained eye.</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Internally Flawless Diamonds (IF)</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <ul>
                                            <li>Some small surface blemishes may be visible under a microscope on IF diamonds.</li>
                                            <li>IF diamonds have no inclusions within the stone, only surface characteristics set the grade.</li>
                                            <li>Visually eye clean.</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Flawless Diamonds (FL)</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <ul>
                                            <li>No internal or external characteristics.</li>
                                            <li>Less than 1% of all diamonds are FL clarity.</li>
                                            <li>A flawless diamond is incredibly rare because it’s nearly impossible to find a diamond 100% free of inclusions.</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" gutterBottom style={{ textAlign: 'left', color: '#1a237e', marginTop: '2%' }}>
                        The Five Diamond Clarity Factors
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                        <ul>
                            <li><b>Size:</b> The larger or more noticeable a characteristic, the lower the likely clarity grade.</li>
                            <li><b>Number:</b> This is the number of easily seen characteristics. Having fewer characteristics means a higher clarity grade.</li>
                            <li><b>Position:</b> What is the position of any given characteristic? The location of a characteristic within the diamond anatomy will impact the rating. Is it under the table (most visible) and close to a pavilion? This position turns inclusions into reflectors, which have a bigger impact on the clarity grade.</li>
                            <li><b>Nature:</b> The nature of a diamond characteristic relates to the type of inclusion and its impact on durability.</li>
                            <li><b>Color and Relief:</b> Color and relief are essentially a measure of how easily a characteristic is seen, or how much contrast there is between the characteristic and surrounding diamond.</li>
                        </ul>
                    </Typography>
                </div>
            </div>
        </Container>
    );
};

export default ClarityEducation;
