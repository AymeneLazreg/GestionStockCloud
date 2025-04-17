import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/browser';
const BarcodeScanner = ({ value, onScan }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  const scanBarcode = async () => {
    if (!webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!video.videoWidth || !video.videoHeight) return;

    canvas.width = 640;
    canvas.height = 480;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const result = await codeReader.current.decodeFromCanvas(canvas);
      if (result?.getText()) {
        const scanned = result.getText();
        if (onScan) onScan(scanned); // ✅ On envoie le résultat au parent
        setError('');
        handleCloseScanner();
      }
    } catch (e) {
      setError('Aucun code détecté pour le moment...');
    }
  };

  const handleOpenScanner = () => {
    setError('');
    setOpen(true);
  };

  const handleCloseScanner = () => {
    setOpen(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (open) {
      const startScanning = () => {
        intervalRef.current = setInterval(scanBarcode, 100);
      };
      setTimeout(startScanning, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [open]);

  return (
    <div>
      <TextField
        label="Code Barre"
        value={value} // ✅ valeur gérée par le parent
        onChange={(e) => onScan && onScan(e.target.value)} // ✅ met à jour dans le parent
        fullWidth
        margin="normal"
        name="codebar"
      />
      <Button variant="contained" color="primary" onClick={handleOpenScanner}>
        Scanner Code Barre
      </Button>

      <Dialog open={open} onClose={handleCloseScanner} fullWidth maxWidth="sm">
        <DialogTitle>Scanner un Code Barre</DialogTitle>
        <DialogContent>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              facingMode: 'environment',
              width: { ideal: 1280 },
              height: { ideal: 720 },
            }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <Typography variant="body2" color="textSecondary" mt={2}>
            {error}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseScanner} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BarcodeScanner;
