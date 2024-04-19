import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { bufferToWave } from './audio-helper';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  private chunks: any[] = [];
  private mediaRecorder: any;
  private audioContext: AudioContext = new AudioContext();
  private audioBlobSubject = new Subject<Blob>();

  audioBlob$ = this.audioBlobSubject.asObservable();

  constructor(private http: HttpClient) {}

  async startRecording() {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event: any) => this.chunks.push(event.data);
    this.mediaRecorder.start();
  }

  async stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.onstop = async () => {
        const audioData = await new Blob(this.chunks).arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(audioData);
        const wavBlob = bufferToWave(audioBuffer, audioBuffer.length);
        this.audioBlobSubject.next(wavBlob);
        // Send the recorded audio blob to your backend
        this.uploadAudioToBackend(wavBlob);
        this.chunks = [];
      };
      this.mediaRecorder.stop();
    }
  }

  private uploadAudioToBackend(blob: Blob): void {
    // Assuming you have a backend endpoint to handle file uploads
    const formData = new FormData();
    formData.append('audio', blob, 'recorded_audio.wav');

    // Replace 'YOUR_BACKEND_UPLOAD_URL' with your actual backend endpoint
    this.http.post('http://localhost:3002/depenses/record', formData)
      .subscribe(
        response => {
          console.log('Audio Recorded successfully:', response);
        },
        error => {
          console.error('Error uploading audio:', error);
          // Handle error if needed
        }
      );
  }
}
