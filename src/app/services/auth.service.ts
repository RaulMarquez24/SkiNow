import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	User,
	updateProfile,
	updatePassword,
	updateEmail,
	updatePhoneNumber
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user$: Observable<User | null>;

	constructor(private auth: Auth) {
		this.user$ = new Observable<User | null>(observer => {
			const unsubscribe = this.auth.onAuthStateChanged(user => {
				observer.next(user);
			});
			return {
				unsubscribe() {
					unsubscribe();
				}
			};
		});
	}

	async register({ name, email, password }: { name: string, email: string, password: string }) {
		try {
			const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
			await updateProfile(userCredential.user, {
				displayName: name,
			});
			return userCredential;
		} catch (e) {
			return null;
		}
	}


	async login({ email, password }: { email: string, password: string }) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	logout() {
		return signOut(this.auth);
	}

	async requestPassword(email: string) {
		try {
			await sendPasswordResetEmail(this.auth, email);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	isAuthenticated(): Observable<boolean> {
		return this.user$.pipe(map(user => !!user));
	}

	async changePassword(newPassword: string): Promise<boolean> {
		try {
			const user = this.auth.currentUser;
			if (user) {
				await updatePassword(user, newPassword);
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	async changeEmail(newEmail: string): Promise<boolean> {
		try {
			const user = this.auth.currentUser;
			if (user) {
				await updateEmail(user, newEmail);
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	async changeName(newName: string): Promise<boolean> {
		try {
			const user = this.auth.currentUser;
			if (user) {
				await updateProfile(user, {
					displayName: newName
				});
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	async deleteUser(): Promise<boolean> {
		try {
			const user = this.auth.currentUser;
			if (user) {
				await user.delete();
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

}