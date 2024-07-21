import React from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Navbar from '../components/navBar';
import Footer from '../components/footer';

const WarrantyPolicy = () => {
    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Diamond Warranty Policy
                        </Typography>

                        <TableContainer component={Paper} sx={{ my: 4 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Warranty Content</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>Free</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>Charged</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>Not Covered</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Resizing (excluding special design models)</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>X</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Cleaning</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>X</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Polishing, re-coating</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>X</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Replacing stones under 2mm</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>X</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Replacing stones over 2mm</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>X</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Product with minor dents, light scratches</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>X</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Product broken, cracked, deformed by external impact, heat, chemical corrosion</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>X</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Lost stones</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>X</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Typography paragraph>
                            We encourage customers to visit the Luxe Jewel House office every 6 months to ensure the product is always in the best condition, minimizing risks of heavy damage or stone loss.
                        </Typography>
                        <Typography paragraph>
                            Please bring the Warranty Certificate when contacting us for inspection and warranty services.
                        </Typography>
                        <Typography paragraph>
                            For warranty items that can be handled within 30 minutes, we will prioritize immediate processing for customers. For items requiring more time, Luxe Jewel House will issue a receipt and return the product within 3 working days, except during peak seasons or holidays.
                        </Typography>
                        <Typography paragraph>
                            Note: Upon receiving the warranty product, we encourage customers to re-check the product according to the "Product Inspection Regulations" in section 5 of the "Purchase Policy".
                        </Typography>
                        <Typography paragraph>
                            Luxe Jewel House reserves the right to refuse warranty for products that show signs of alteration, impact, adjustment, or repair by unauthorized entities.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
            <Footer />
        </div>
    );
}

export default WarrantyPolicy;
