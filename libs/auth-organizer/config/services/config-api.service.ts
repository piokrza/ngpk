import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

import { AppConfig } from '@ngpk/auth-organizer/config/models';
import { Collection } from '@ngpk/core/enum';

@Injectable({ providedIn: 'root' })
export class ConfigApiService {
  private readonly angularFirestore = inject(AngularFirestore);

  loadConfig$(uid: string): Observable<AppConfig> {
    return this.angularFirestore
      .collection<AppConfig>(Collection.CONFIG, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' })
      .pipe(map((config: AppConfig[]) => config[0]));
  }

  async updateConfig(config: AppConfig): Promise<void> {
    const cashFlow: AngularFirestoreDocument<AppConfig> = this.angularFirestore.collection<AppConfig>(Collection.CONFIG).doc(config.id);

    return await cashFlow.update(config);
  }
}
