import React from 'react';
import Card from '@material-ui/core/Card';
import './FileUpload.css';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {Input} from "@material-ui/core";


class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            showDownloadBtn: null,
            showUploadBtn: true
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.fileUpload(this.state.file, this.state.algorithm).then((response) => {
            console.log(response.data);
            alert("File successfully uploaded")
        })
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    fileUpload(file) {
        const url = 'http://localhost:8080/api/file-upload';
        const formData = new FormData();
        formData.append('file', file);
        this.setState({showDownloadBtn: true});
        this.setState({showUploadBtn: false});
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return axios.post(url, formData, config)
    }

    fileDownload = () => {
        fetch('http://localhost:8080/api/download')
            .then(response => {
                response.blob().then(blob => {
                    debugger
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'output.json';
                    a.click();
                });
            });
    }

    render() {

        const DownloadBtn = () => (
            <Link href="#" onClick={this.fileDownload}>
                <Button variant="contained">
                    Download
                </Button>
            </Link>
        )

        const UploadBtn = () => (
            <Button variant="contained" type="submit">Upload</Button>
        )

        return (
            <Card className="Card">
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        CUJO
                    </Typography>
                    <Typography variant="h5" component="h2">
                        CHALLENGE
                    </Typography>

                </CardContent>
                <CardActions>
                    <form onSubmit={this.onFormSubmit}>

                        <br/><br/><br/>

                        <Input type="file" onChange={this.onChange}/>
                        <br/><br/><br/>

                        {this.state.showUploadBtn ? <UploadBtn/> : ""}
                        {this.state.showDownloadBtn ? <DownloadBtn/> : ""}

                    </form>
                </CardActions>
            </Card>
        );
    }

}

export default FileUpload;
