/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const KEY_REGEX = /\d+-\d+/i;

function extractFlowerLayout(json) {
  if (!('flowerLayout' in json)) throw new Error('Missing layout data.');
  const { flowerLayout } = json;

  const type = Object.prototype.toString.call(flowerLayout);
  if (type !== '[object Object]') throw new Error('Invalid data type.');

  Object.entries(flowerLayout).forEach(([key, value]) => {
    if (key.match(KEY_REGEX) === null || !Number.isInteger(value)) {
      throw new Error('Invalid data format.');
    }
  });
  return flowerLayout;
}

export default function LoadDialog({ open, setOpen, setFlowerLayout }) {
  const [selectedFile, setFile] = useState(undefined);
  const [error, setError] = useState(undefined);
  const close = () => {
    setOpen(false);
  };

  const loadFile = () => {
    const reader = new FileReader();
    reader.onload = () => {
      // The file is not loaded until onload fires.
      try {
        const fileData = JSON.parse(reader.result);
        const flowerLayout = extractFlowerLayout(fileData);

        close();
        setFlowerLayout(flowerLayout);
      } catch (e) {
        setError(e.message);
      }
    };

    reader.onerror = () => {
      setError('An error occurred while loading the file.');
      reader.abort();
    };

    reader.readAsText(selectedFile);
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Load flower layout from file
      </DialogTitle>
      <DialogContent>
        <p>
          Only .json files saved from the ANCH flower planner will load
          properly.
        </p>
        <input
          type="file"
          accept="application/json"
          style={{
            margin: '16px',
            transform: 'scale(1.5)',
            transformOrigin: '0 0 ',
          }}
          onChange={handleChange}
        />
        <p style={{ color: 'red' }}>{error}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Cancel
        </Button>
        <Button onClick={loadFile} disabled={!selectedFile} color="primary">
          Load
        </Button>
      </DialogActions>
    </Dialog>
  );
}
