import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Sidebar from '../sidebar';
import diamondCut from '../../../constant/diamondCut.png'
import diamondCut2 from '../../../constant/diamondCut2.png'

const CutEducation = () => {
    return (
        <Container maxWidth={false} style={{ backgroundColor: 'white', paddingTop: '1%', paddingBottom: '2%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '25%' }}>
                    <Sidebar />
                </div>
                <div>
                    <div style={{ width: '75%', paddingLeft: '5%' }}>
                        <Typography variant="h4" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                            Diamond Cut
                        </Typography>
                        <hr style={{ backgroundColor: 'black', height: '4px' }} />
                        <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                            The cut of a diamond determines its brilliance. A well-cut diamond reflects light beautifully and looks stunning. Understanding diamond cut is essential to making an informed purchase decision.
                        </Typography>
                        <Typography variant="h6" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                            What is Diamond Cut?
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                            Diamond cut refers to how well a diamond's facets interact with light. The cut of a diamond dramatically impacts its appearance and value. A well-cut diamond will exhibit optimal brilliance, fire, and scintillation.
                        </Typography>
                        <Typography variant="h6" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                            The 4Cs of Diamond Cut
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                            The Gemological Institute of America (GIA) assesses diamond cut quality by examining the following criteria:
                        </Typography>
                        <Typography variant="body1" style={{ textAlign: 'left', marginBottom: '2%' }}>
                            <ul>
                                <li><b>Brightness:</b> The amount of white light reflected from the surface and interior of the diamond.</li>
                                <li><b>Fire:</b> The dispersion of light into the colors of the spectrum.</li>
                                <li><b>Scintillation:</b> The pattern of light and dark areas caused by reflections within the diamond.</li>
                                <li><b>Proportions:</b> The angles and relative measurements of a diamond’s facets.</li>
                            </ul>
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt="Diamond Cut Example"
                                        height="300"
                                        image={diamondCut}
                                    />

                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h4" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                                    We Offers Four Different Cut Grades
                                </Typography>
                                <Typography variant="h6" gutterBottom>Excellent Cut</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Excellent cut diamonds offer exceptional brilliance and fire. They are slightly less proportioned than ideal cut diamonds but still provide a stunning visual appearance.
                                </Typography>
                                <Typography variant="h6" gutterBottom>Ideal Cut</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Ideal cut diamonds are perfectly proportioned to reflect the maximum amount of light. They exhibit the highest level of brilliance and fire, making them highly sought after.
                                </Typography>
                                <Typography variant="h6" gutterBottom>Very Good Cut</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Very good cut diamonds offer great brilliance and fire. They are well-proportioned and offer a high level of visual appeal at a more accessible price point.
                                </Typography>
                                <Typography variant="h6" gutterBottom>Good Cut</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Good cut diamonds reflect most light that enters the diamond. They offer a good balance of beauty and value.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" gutterBottom style={{ textAlign: 'left', color: '#1a237e', marginTop: '2%' }}>
                            How to Choose the Right Diamond Cut
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                            When selecting a diamond, consider your budget and personal preferences. Ideal and excellent cuts provide the highest level of brilliance, while very good and good cuts offer a balance between beauty and cost.
                        </Typography>
                    </div>
                    <div style={{ width: '75%', paddingLeft: '5%' }}>
                        <Typography variant="h6" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                            The Anatomy Of A Diamond:
                        </Typography>
                        <Typography variant="body1" style={{ textAlign: 'left', marginBottom: '2%' }}>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                <li><b>Table:</b> The largest facet of a gemstone </li>
                                <li><b>Crown:</b> The top portion of a diamond extending from the girdle to the table </li>
                                <li><b>Girdle:</b> The intersection of the crown and pavilion which defines the circumference of a diamond </li>
                                <li><b>Diameter:</b> The measurement from one girdle edge of a diamond straight across to the opposing side </li>
                                <li><b>Pavilion:</b> The bottom portion of a diamond, extending from the girdle to the culet </li>
                                <li><b>Culet:</b> The facet at the tip of a gemstone. The preferred culet is not visible with the unaided eye (graded "none" or "small") </li>
                                <li><b>Depth:</b> The height of a gemstone measured from the culet to the table</li>
                            </ul>
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt="Diamond Cut Example"
                                        height="300"
                                        image={diamondCut2}
                                    />

                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h4" gutterBottom style={{ textAlign: 'left', color: '#1a237e' }}>
                                    Diamond Cut And Diamond Shape Are Not The Same Thing
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Although these terms are sometimes used interchangeably, diamond cut, and diamond shape mean different things.
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <b>Diamond cut</b> assesses light performance of a diamond and is based on a combination of factors: proportions, symmetry, and polish (the overall surface condition of a diamond’s facets).
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <b>Diamond shape</b> is related to the outline of a diamond. While the round brilliant diamond is our most popular shape, we also offer nine non-round fancy-shaped diamonds that can save you up to 25.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" gutterBottom style={{ textAlign: 'left', color: '#1a237e', marginTop: '2%' }}>
                            How to Choose the Right Diamond Cut
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginBottom: '2%' }}>
                            When selecting a diamond, consider your budget and personal preferences. Ideal and excellent cuts provide the highest level of brilliance, while very good and good cuts offer a balance between beauty and cost.
                        </Typography>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CutEducation;
