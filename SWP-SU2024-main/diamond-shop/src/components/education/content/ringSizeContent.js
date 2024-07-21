import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import '../css/ringSize.css';
import ringSize from '../../../constant/ring_size.png';
import Sidebar from '../sidebar';

const RingSizeGuide = () => {
    return (
        <Container maxWidth={false} style={{ backgroundColor: 'white', paddingTop: '1%', paddingBottom: '2%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '40%' }}>
                    <Sidebar />
                </div>
                <div style={{ paddingLeft: '5%' }}>
                    <Typography style={{ textAlign: 'left' }} variant="h4" align="center" gutterBottom>
                        How To Measure Your Ring Size
                    </Typography>
                    <hr style={{ backgroundColor: 'black', height: '4px' }} />
                    <Typography style={{ textAlign: 'left' }} variant="body1" align="center" paragraph>
                        To help you find the right ring size, our jewelry experts have put together this complete ring size guide including a ring size chart, printable ring sizer, and tips for measuring at home. We've helped over 500,000 couples find engagement rings and wedding rings that are a perfect fit. Our free ring sizers can help you measure your ring size or a loved one's ring size.
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="Free Ring Sizer"
                                    height="fit-content"
                                    image={ringSize}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Free Ring Sizer</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Get a free plastic ring sizer mailed to you.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="Ring Size Chart & Printable Guide"
                                    height="fit-content"
                                    image={ringSize}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Ring Size Chart & Printable Guide</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Check out our printable ring sizer and size conversion chart.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography style={{ textAlign: 'left' }} variant="h6" gutterBottom>Measuring Ring Size With Our Printable Ring Size Chart</Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        If you're looking to measure a ring size in a hurry, our printable ring sizer is the perfect tool to help.
                        Simply print out the guide and place a ring the wearer already owns over the circles, matching the inside
                        of the ring to the circle nearest in size. If the ring is between two circle sizes, choose the larger size.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        Our printable ring size guide also includes a ring size chart with precise diameter measurements and their corresponding
                        ring sizes along with international ring sizes. With our online ring sizer, you'll quickly find out the right size.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'left' }} variant="h6" gutterBottom>Average Ring Sizes for Women and Men</Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        The average ring size for women ranges from size 3 to size 9. The most purchased women's rings range between size 5 and size 7.
                        Size 6 is the most popular. The average ring size for men ranges from size 6 to size 13. The most purchased men's rings range
                        between size 8 to 10-½. Size 9 is the most popular.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        These standard ring sizes can help guide you in the right direction. If you do not see the size you need, contact our experts
                        for help placing a special order. There are also a number of at-home methods to find your ring size.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'left' }} variant="h6" gutterBottom>How To Measure Ring Size With String, Paper & Ruler</Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        If you're wondering how to measure ring size at home, there are creative steps you can take to find the right fit. When shopping
                        for someone else, the best way to find their ring size is to ask them directly. If you're planning a surprise, get help from
                        friends and family. They can ask without raising any eyebrows. You can also use our ring size print out to measure their existing
                        rings to find their size.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        There are also several at-home methods you can use to find your ring size or your gift recipient's ring size. These methods require
                        a few simple tools to find the right fit including a piece of string, a ruler, a pen and a piece of paper. The at-home method for
                        how to measure ring size may also require a quick calculation to find the numeric size.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'left' }} variant="h6" gutterBottom>Measure Your Ring Size With These Steps:</Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        1. Wrap string or paper around the base of your finger.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        2. Mark the point where the ends meet with a pen.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        3. Measure the string or paper with a ruler (mm) then divide by 3.14 (or Pi) to get the diameter of the ring.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        4. Pick the closest measurement on the ring size chart to find your ring size.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'left' }} variant="h6" gutterBottom>More Ring Sizing Tips</Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        1. Measure the inside of another ring that fits using a tape measure and our printable ring sizer.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        2. The ring should fit your finger comfortably: snug enough so it won't fall off, but loose enough to slide over your knuckle with relative ease.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        3. When the knuckle is bigger than the base of the finger, measure both places and pick a size in between the two.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        4. Measure your ring size at the end of the day when your fingers are warm. Finger size changes depending on
                        the time of day and the weather, and your fingers are actually smaller in the early morning and in cold weather.
                        Also, keep in mind that fingers on your dominant hand are usually larger.
                    </Typography>
                    <Typography style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary">
                        5. Measure 3 to 4 times for more accuracy.
                    </Typography>
                </div>
            </div>
        </Container>
    );
};

export default RingSizeGuide;
