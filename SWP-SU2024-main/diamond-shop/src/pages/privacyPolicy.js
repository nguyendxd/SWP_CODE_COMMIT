import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Navbar from '../components/navBar';
import Footer from '../components/footer';

const PrivacyPolicy = () => {
    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Privacy Policy
                        </Typography>

                        <Typography variant="h6" component="h2" gutterBottom>
                            1. Information Collection
                        </Typography>
                        <Typography paragraph>
                            We collect personal information from you when you register on our site, place an order, subscribe to our newsletter, or fill out a form. The types of personal information we collect may include your name, email address, mailing address, phone number, and payment information.
                        </Typography>

                        <Typography variant="h6" component="h2" gutterBottom>
                            2. Use of Information
                        </Typography>
                        <Typography paragraph>
                            The information we collect from you may be used in one of the following ways:
                            <ul>
                                <li>To personalize your experience (your information helps us to better respond to your individual needs)</li>
                                <li>To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)</li>
                                <li>To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)</li>
                                <li>To process transactions (your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering the purchased product or service requested)</li>
                                <li>To administer a contest, promotion, survey, or other site feature</li>
                                <li>To send periodic emails (the email address you provide for order processing may be used to send you information and updates pertaining to your order, in addition to receiving occasional company news, updates, related product or service information, etc.)</li>
                            </ul>
                        </Typography>

                        <Typography variant="h6" component="h2" gutterBottom>
                            3. Information Protection
                        </Typography>
                        <Typography paragraph>
                            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. These security measures include password-protected directories and databases to safeguard your information.
                        </Typography>

                        <Typography variant="h6" component="h2" gutterBottom>
                            4. Cookies
                        </Typography>
                        <Typography paragraph>
                            We use cookies to enhance your experience, gather general visitor information, and track visits to our website. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings.
                        </Typography>

                        <Typography variant="h6" component="h2" gutterBottom>
                            5. Disclosure of Information to Third Parties
                        </Typography>
                        <Typography paragraph>
                            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                        </Typography>

                        <Typography variant="h6" component="h2" gutterBottom>
                            6. Third Party Links
                        </Typography>
                        <Typography paragraph>
                            Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.
                        </Typography>

                        <Typography variant="h6" component="h2" gutterBottom>
                            7. Your Consent
                        </Typography>
                        <Typography paragraph>
                            By using our site, you consent to our privacy policy.
                        </Typography>

                        <Typography variant="h6" component="h2" gutterBottom>
                            8. Changes to our Privacy Policy
                        </Typography>
                        <Typography paragraph>
                            If we decide to change our privacy policy, we will post those changes on this page. This policy was last modified on [Date].
                        </Typography>

                        <Typography variant="h6" component="h2" gutterBottom>
                            9. Contacting Us
                        </Typography>
                        <Typography paragraph>
                            If there are any questions regarding this privacy policy, you may contact us using the information below:
                            <br/>
                            Phone: 123-456-789
                        </Typography>
                    </Box>
                </Paper>
            </Container>
            <Footer/>
        </div>
    );
}

export default PrivacyPolicy;
