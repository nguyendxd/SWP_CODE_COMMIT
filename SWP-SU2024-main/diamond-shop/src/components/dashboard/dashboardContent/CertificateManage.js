import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import DashboardNav from './DashboardNav';
import StaffNav from './../../staffsite/StaffNav';
import { useAuth } from '../../authcontext';
import './CertificateManage.css'

const CertificateManage = () => {
    const [diamonds, setDiamonds] = useState([]);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [selectedDiamond, setSelectedDiamond] = useState(null);
    const { user } = useAuth();
    const [showCreateCertificateModal, setShowCreateCertificateModal] = useState(false);
    const [certificateDetails, setCertificateDetails] = useState({
        reportNumber: '',
        clarityCharacteristics: '',
        inscription: '',
        comments: '' // Add the comments field here
    });

    const fetchDiamonds = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/diamonds');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Update the diamonds state
            setDiamonds(data);
        } catch (error) {
            console.log('Error fetching diamonds', error);
        }
    };

    const handleCreateCertificate = (diamond) => {
        setSelectedDiamond(diamond);
        setShowCreateCertificateModal(true);
    };

    const handleCertificateDetailChange = (e) => {
        const { name, value } = e.target;
        setCertificateDetails({ ...certificateDetails, [name]: value });
    };

    const handleSaveCertificate = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/certificate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    diamondId: selectedDiamond.diamondId, // Ensure the field name matches exactly
                    ...certificateDetails
                })
            });
            if (!response.ok) {
                throw new Error('Failed to create certificate');
            }
            await fetchDiamonds(); // Refresh diamonds list to show the updated certificate status
            setShowCreateCertificateModal(false);
            setSelectedDiamond(null);
        } catch (error) {
            console.error('Error creating certificate', error);
        }
    };

    useEffect(() => {
        fetchDiamonds();
    }, []);

    const handleViewCertificate = (diamond) => {
        setSelectedDiamond(diamond);
        setShowCertificateModal(true);
    };

    const handleCloseCertificateModal = () => {
        setShowCertificateModal(false);
        setSelectedDiamond(null);
    };

    return (
        <div>
            {user && user.roleId === 3 ? <StaffNav /> : <DashboardNav />}
            <div className='container-fluid'>
                <TableContainer component={Paper} className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Diamond ID</TableCell>
                                <TableCell align="center">Shape</TableCell>
                                <TableCell align="center">Cut</TableCell>
                                <TableCell align="center">Color</TableCell>
                                <TableCell align="center">Clarity</TableCell>
                                <TableCell align="center">Carat Weight</TableCell>
                                <TableCell align="center">Certificate</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {diamonds.map((diamond) => (
                                <TableRow key={diamond.diamondId}>
                                    <TableCell align="center">{diamond.diamondId}</TableCell>
                                    <TableCell align="center">{diamond.shape}</TableCell>
                                    <TableCell align="center">{diamond.cut}</TableCell>
                                    <TableCell align="center">{diamond.color}</TableCell>
                                    <TableCell align="center">{diamond.clarity}</TableCell>
                                    <TableCell align="center">{diamond.caratWeight}</TableCell>
                                    <TableCell align="center">{diamond.certificate ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">
                                        {diamond.certificate ? (
                                            <Button variant="contained" color="primary" onClick={() => handleViewCertificate(diamond)}>
                                                View Certificate
                                            </Button>
                                        ) : (
                                            <Button variant="contained" color="secondary" onClick={() => handleCreateCertificate(diamond)}>
                                                Create Certificate
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={showCreateCertificateModal} onClose={() => setShowCreateCertificateModal(false)} maxWidth="md" fullWidth>
                    <DialogTitle>Create Certificate</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Report Number"
                            type="text"
                            fullWidth
                            name="reportNumber"
                            value={certificateDetails.reportNumber}
                            onChange={handleCertificateDetailChange}
                        />
                        <TextField
                            margin="dense"
                            label="Clarity Characteristics"
                            type="text"
                            fullWidth
                            name="clarityCharacteristics"
                            value={certificateDetails.clarityCharacteristics}
                            onChange={handleCertificateDetailChange}
                        />
                        <TextField
                            margin="dense"
                            label="Inscription"
                            type="text"
                            fullWidth
                            name="inscription"
                            value={certificateDetails.inscription}
                            onChange={handleCertificateDetailChange}
                        />
                        <TextField
                            margin="dense"
                            label="Comments"
                            type="text"
                            fullWidth
                            name="comments"
                            value={certificateDetails.comments}
                            onChange={handleCertificateDetailChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowCreateCertificateModal(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveCertificate} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={showCertificateModal} onClose={handleCloseCertificateModal} maxWidth="md" fullWidth>
                    <DialogTitle>Diamond Certificate</DialogTitle>
                    <DialogContent>
                        {selectedDiamond && selectedDiamond.certificate ? (
                            <div className="certificate">
                                <div className="header" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/swp-diamond-shop.appspot.com/o/Logo%2Flogo_certificate.png?alt=media&token=31178553-5511-409a-8047-ac5dd6ff095e" alt="GIA Logo" style={{ width: '100px' }} />
                                    <h2>GIA Natural Diamond Dossier</h2>
                                </div>
                                <div className="section">
                                    <div className="section-title">Grading Results</div>
                                    <div className="section-content">
                                        <p>Report Date: January 01, 2014</p>
                                        <p>Report Number: {selectedDiamond.certificate.reportNumber}</p>
                                        <p>Shape and Cutting Style: {selectedDiamond.shape}</p>
                                        <p>Measurements: {selectedDiamond.measurements}</p>
                                    </div>
                                </div>
                                <div className="section">
                                    <div className="section-title">Grading Information</div>
                                    <div className="section-content grading-info">
                                        <div>
                                            <p>Carat Weight: {selectedDiamond.caratWeight} carat</p>
                                            <p>Color Grade: {selectedDiamond.color}</p>
                                            <p>Clarity Grade: {selectedDiamond.clarity}</p>
                                        </div>
                                        <div>
                                            <table className="table">
                                                <tr>
                                                    <th>Polish</th>
                                                    <td>{selectedDiamond.cut}</td>
                                                </tr>
                                                <tr>
                                                    <th>Symmetry</th>
                                                    <td>{selectedDiamond.symmetry}</td>
                                                </tr>
                                                <tr>
                                                    <th>Fluorescence</th>
                                                    <td>{selectedDiamond.fluorescence}</td>
                                                </tr>
                                                <tr>
                                                    <th>Clarity Characteristics</th>
                                                    <td>{selectedDiamond.certificate.clarityCharacteristics}</td>
                                                </tr>
                                                <tr>
                                                    <th>Inscription</th>
                                                    <td>{selectedDiamond.certificate.inscription}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="section">
                                    <div className="section-title">Comments</div>
                                    <div className="section-content">
                                        <p>{selectedDiamond.certificate.comments}</p>
                                    </div>
                                </div>
                                <div className="footer">
                                    <p>The results documented in this report refer only to the diamond described, and were obtained using the techniques and equipment available to GIA at the time of examination. This report is not a guarantee or valuation. For additional information and important limitations and disclaimers, please see GIA.edu/terms or call +1 800 421 7250 or +1 760 603 4500. ©2020 Gemological Institute of America, Inc.</p>
                                </div>
                            </div>
                        ) : (
                            <p>No certificate available for this diamond.</p>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCertificateModal} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default CertificateManage;
