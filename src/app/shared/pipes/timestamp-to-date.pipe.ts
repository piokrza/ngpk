import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({ name: 'timestampToDate', standalone: true, pure: true })
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: Timestamp): Date {
    return timestamp!.toDate();
  }
}
