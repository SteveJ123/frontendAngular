import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, map, Observable, switchMap, tap } from "rxjs";
import { apiUrl } from "../core/constants/api";
import { HttpParams } from "@angular/common/http";

export interface MediaFile {
  filename: string;
  path: string;
  mimetype: string;
  mediaType: string;
}

export interface Post {
  _id: string;
  content: string;
  tagIds: string[];
  membershipIds: string[];
  mediaFiles: MediaFile[];
  createdAt: string;
  updatedAt: string;
}

export interface PostsResponse {
  success: boolean;
  message: string;
  data: Post[];
}

@Injectable({
  providedIn: "root",
})
export class Service {
  private apiUrl = `${apiUrl}api/`;
  // private apiUrl = 'http://localhost:5000/api/';
  // private apiUrl = 'https://backend-2rgv.onrender.com/api/';

  // 1. Subject to hold notifications array state
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  // 2. Reactive stream for unread count
  // unreadCount$: Observable<number> = this.notifications$.pipe(
  //   map((list) => list.filter((n) => !n.isRead).length),
  // );
  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  // getPosts(): Observable<PostsResponse> {
  //   return this.http.get<PostsResponse>(this.apiUrl + 'posts');
  // }

  getPosts(language?: any): Observable<PostsResponse> {
    let params = new HttpParams();

    if (language) {
      params = params.set("language", language);
    }

    return this.http.get<PostsResponse>(this.apiUrl + "posts", { params });
  }

  getPostsByUserId(userId: any): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(`${this.apiUrl}posts/user/${userId}`);
  }

  posts(formData: any) {
    return this.http.post(this.apiUrl + "posts", formData);
  }

  registerView(postId: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}posts/${postId}/view`, {});
  }

  toggleLike(postId: any, userId: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}posts/${postId}/like`, { userId });
  }

  getPostComments(postId: any) {
    return this.http.get(`${this.apiUrl}comments/post/${postId}`);
  }

  postComments(commentPayload: any) {
    return this.http.post(`${this.apiUrl}comments`, commentPayload);
  }

  getCourses(
    language?: string,
    courseType?: string,
    role?: string,
  ): Observable<any> {
    let params = new HttpParams();
    if (language) params = params.set("language", language);
    if (courseType) params = params.set("courseType", courseType);
    if (role) params = params.set("role", role);

    return this.http.get<any>(`${this.apiUrl}courses`, { params });
  }

  /**
   * POST: Create a new course with multipart form data (handles file upload)
   */
  createCourse(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}courses`, formData);
  }

  /**
   * PUT: Update an existing course by ID (handles optional file replacement)
   */
  updateCourse(id: any, formData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}courses/${id}`, formData);
  }

  /**
   * DELETE: Remove a course by ID
   */
  deleteCourse(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}courses/${id}`);
  }

  // getUserProfile(userId: any, lang: any = 'te'): Observable<any> {
  //   return this.http.get(`${this.getApiUrl(lang)}personal-details/${userId}`);
  // }

  private getApiUrl(lang: any = "te"): any {
    const isEnglish =
      lang?.toLowerCase().trim() === "en" ||
      lang?.toLowerCase().trim() === "english";
    return isEnglish ? `${this.apiUrl}en/` : `${this.apiUrl}`;
  }

  // --- NOTIFICATION API ENDPOINTS ---

  fetchNotifications(userId: any): void {
    if (!userId) return;
    const params = new HttpParams().set("userId", userId);
    this.http.get<any>(`${this.apiUrl}notifications`, { params }).subscribe({
      next: (res) => {
        console.log("res-----", res.data);
        const list = res.data || [];
        const unread = list.filter((n: any) => !n.isRead).length;
        this.notificationsSubject.next(list);
        this.unreadCountSubject.next(unread);
      },
      error: (err) => console.error("Failed to load notifications", err),
    });
  }

  /**
   * PATCH /api/notifications/read-all
   * Marks all notifications for a specific user as read in the backend.
   */
  markAllAsRead(userId: any, language?: any): Observable<any> {
    let params = new HttpParams();
    if (userId) {
      params = params.set("userId", userId);
    }
    if (language && language.trim() !== "") {
      params = params.set("language", language.trim());
    }

    const endpoint = `${this.apiUrl}notifications/read-all`;

    return this.http.patch<any>(endpoint, {}, { params }).pipe(
      tap(() => {
        // Clear notifications locally once successfully updated on the server
        this.notificationsSubject.next([]);
        this.unreadCountSubject.next(0);
      }),
    );
  }

  updatePost(postId: any, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}posts/${postId}`, formData);
  }

  deletePost(postId: any, userId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}posts/${postId}?userid=${userId}`);
  }

  getSession(language: any, courseType: any, role: any) {
    // return this.http.get(`${this.apiUrl}courses?search=${encodeURIComponent(url)}`);
    let params = new HttpParams();
    if (language) {
      params = params.set("language", language);
    }
    if (courseType) {
      params = params.set("courseType", courseType);
    }

    if (role) {
      params = params.set("role", role);
    }
    return this.http.get(`${this.apiUrl}session`, { params });
  }

  createSession(formData: any) {
    return this.http.post(`${this.apiUrl}session`, formData);
  }

  updateSession(id: any, formData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}session/${id}`, formData);
  }

  /**
   * Deletes a course by ID (backend will automatically unlink the thumbnail file).
   */
  deleteSession(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}session/${id}`);
  }

  getProducts(language?: any): Observable<any> {
    let params = new HttpParams();
    if (language) {
      params = params.set("language", language);
    }
    return this.http.get<any>(`${this.apiUrl}products`, { params });
  }

  createProduct(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}products`, formData);
  }

  updateProduct(id: any, formData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}products/${id}`, formData);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}products/${id}`);
  }

  //   return this.http.get<PostsResponse>(this.apiUrl + 'admin-posts');
  // }

  getAdminPosts(language?: any): Observable<PostsResponse> {
    let params = new HttpParams();
    if (language) {
      params = params.set("language", language);
    }
    return this.http.get<PostsResponse>(this.apiUrl + "admin-posts", {
      params,
    });
  }

  getAdminPostsById(userId: any): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(
      `${this.apiUrl}admin-posts/admin/${userId}`,
    );
  }

  postsAdmin(formData: any) {
    return this.http.post(this.apiUrl + "admin-posts", formData);
  }

  updateAdminPost(postId: any, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}admin-posts/${postId}`, formData);
  }

  registerAdminPostView(postId: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}admin-posts/${postId}/view`, {});
  }

  toggleAdminPostLike(postId: any, userId: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}admin-posts/${postId}/like`, {
      userId,
    });
  }

  deleteAdminPost(postId: any, userId: any): Observable<any> {
    // return this.http.delete(`${this.apiUrl}admin-posts/${postId}?userid=${userId}`);
    const params = new HttpParams().set("userid", userId);
    return this.http.delete(`${this.apiUrl}admin-posts/${postId}`, { params });
  }

  getAdminPostComments(postId: any) {
    return this.http.get(`${this.apiUrl}admin-comments/post/${postId}`);
  }

  postAdminComments(commentPayload: any) {
    return this.http.post(`${this.apiUrl}admin-comments`, commentPayload);
  }

  fetchTrackerUpdate(userId: any) {
    return this.http.get(`${this.apiUrl}tracker-status/${userId}`);
  }

  MarkPracticeComplete(userId: any) {
    return this.http.post(`${this.apiUrl}complete-today`, { userId });
  }

  getLeaderboard(language?: any): Observable<any> {
    let params = new HttpParams();
    if (language) {
      params = params.set("lang", language);
    }
    return this.http.get<any>(`${this.apiUrl}leaderboard`, { params });
  }

  /**
   * GET: Fetch support team members (filtered by language)
   */
  getSupportTeam(language?: any): Observable<any> {
    let params = new HttpParams();
    if (language) {
      params = params.set("language", language);
    }
    return this.http.get<any>(`${this.apiUrl}support-team`, { params });
  }

  /**
   * POST: Create a new support team member
   */
  createMember(memberData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}support-team`, memberData);
  }

  /**
   * PUT: Update an existing support team member by ID
   */
  updateMember(id: any, memberData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}support-team/${id}`, memberData);
  }

  /**
   * DELETE: Remove a support team member by ID
   */
  deleteMember(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}support-team/${id}`);
  }

  getUsersTrackerSummary(language?: any): Observable<any> {
    let params = new HttpParams();
    if (language) {
      params = params.set("language", language);
    }
    return this.http.get<any>(`${this.apiUrl}admin-users-tracker`, { params });
  }

  // getPersonalDetails(userId: any) {
  //   return this.http.get<any>(`${this.apiUrl}personal-details/${userId}`);
  // }
  // uploadProfilePicture(userId: any, formData: any) {
  //   return this.http.put<any>(`${this.apiUrl}personal-details/${userId}/profile-image`, formData);
  // }

  // postProfilePicture(userId: any, formData: any) {
  //   return this.http.post<any>(`${this.apiUrl}personal-details/${userId}/profile-image`, formData);
  // }

  // deleteProfilePicture(userId: any) {
  //   return this.http.delete<any>(`${this.apiUrl}personal-details/${userId}/profile-image`);
  // }

  /**
   * GET: Fetch personal details for a user based on language
   */
  getPersonalDetails(userId: any, language: any): Observable<any> {
    const params = new HttpParams().set("language", language);
    return this.http.get<any>(`${this.apiUrl}personal-details/${userId}`, {
      params,
    });
  }

  /**
   * PUT: Update text personal details (name, aboutYou, gender, birthday, language)
   */
  updatePersonalDetails(userId: any, details: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}personal-details/${userId}`,
      details,
    );
  }

  /**
   * PUT: Upload or replace profile image file
   */
  uploadProfileImage(userId: any, formData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}personal-details/${userId}/profile-image`,
      formData,
    );
  }

  /**
   * DELETE: Remove profile image
   */
  deleteProfileImage(userId: any, language: any): Observable<any> {
    const params = new HttpParams().set("language", language);
    return this.http.delete<any>(
      `${this.apiUrl}personal-details/${userId}/profile-image`,
      {
        params,
      },
    );
  }

  // Fetch all courses filtered by language
  dgetCourses(language: any): Observable<any> {
    const params = new HttpParams().set("language", language);
    return this.http.get<any>(this.apiUrl, { params });
  }

  // Fetch single course details
  getCourseById(courseId: any, language: any): Observable<any> {
    const params = new HttpParams().set("language", language);
    return this.http.get<any>(`${this.apiUrl}course/${courseId}`, { params });
  }

  // Create course (pass language in payload)
  createCourseLecture(courseData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, courseData);
  }

  // Upload lecture video (append language inside FormData)
  uploadLecture(courseId: any, formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}course/${courseId}/lectures`,
      formData,
    );
  }

  // Update course
  updateCourseLecture(courseId: any, courseData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${courseId}`, courseData);
  }

  // Delete course
  deleteCourseLecture(courseId: any, language: any): Observable<any> {
    const params = new HttpParams().set("language", language);
    return this.http.delete<any>(`${this.apiUrl}/${courseId}`, { params });
  }

  // // Delete specific lecture
  // deleteLecture(courseId: any, lectureId: any, language: any): Observable<any> {
  //   const params = new HttpParams().set('language', language);
  //   return this.http.delete<any>(`${this.apiUrl}/${courseId}/lectures/${lectureId}`, { params });
  // }

  // Update an existing lecture
  updateLecture(courseId: any, lectureId: any, formData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}course/${courseId}/lectures/${lectureId}`,
      formData,
    );
  }

  // Delete a specific lecture
  deleteLecture(
    courseId: any,
    lectureId: any,
    language: string,
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}course/${courseId}/lectures/${lectureId}?language=${language}`,
    );
  }

  /**
   * GET /api/notifications?userId=xxx
   * Direct observable method.
   */
  getUserNotifications(userId: any, language?: any): Observable<any> {
    let params = new HttpParams();

    if (userId) {
      params = params.set("userId", userId);
    }

    // Only appends 'language' if a truthy string value is supplied
    if (language && language.trim() !== "") {
      params = params.set("language", language.trim());
    }

    return this.http.get<any>(`${this.apiUrl}notifications`, { params });
  }

  getAdminProfile() {
    return this.http.get(`${this.apiUrl}admin-profile`);
  }
  getAdminProfileById(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}admin-profile/${userId}`);
  }

  /**
   * PATCH /api/notifications/:id/read
   * Marks a notification as read and updates state optimistically.
   */
  markAsRead(notificationId: any): Observable<any> {
    const endpoint = `${this.apiUrl}notifications/${notificationId}/read`;

    return this.http.patch<any>(endpoint, {}).pipe(
      tap(() => {
        const currentList = this.notificationsSubject.value.map((item) => {
          if (item._id === notificationId) {
            return { ...item, isRead: true };
          }
          return item;
        });

        const newUnreadCount = currentList.filter(
          (item) => !item.isRead,
        ).length;

        this.notificationsSubject.next(currentList);
        this.unreadCountSubject.next(newUnreadCount);
      }),
    );
  }

  getEvents(lang: any): Observable<any> {
    return this.http.get(`${this.apiUrl}events?language=${lang}`);
  }

  createEvent(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}events`, formData);
  }

  updateEvent(id: any, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}events/${id}`, formData);
  }

  deleteEvent(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}events/${id}`);
  }

  uploadMedia(file: File, folder: any = "media"): Observable<string> {
    // Step 1: Get presigned upload URL from backend
    return this.http
      .post<{
        success: boolean;
        uploadUrl: any;
        fileUrl: any;
      }>(`${this.apiUrl}/media/upload-url`, { fileType: file.type, folder })
      .pipe(
        switchMap((res) => {
          const headers = new HttpHeaders({ "Content-Type": file.type });
          // Step 2: Directly PUT binary file to AWS S3
          return this.http.put(res.uploadUrl, file, { headers }).pipe(
            map(() => res.fileUrl), // Returns the clean S3 file URL upon completion
          );
        }),
      );
  }

  uploadAWSMedia(formData: any) {
    return this.http.post(this.apiUrl + "upload_parallel", formData);
  }

  // Fetch all items (filtered by language)
  getNutritionItems(
    language?: any,
  ): Observable<{ success: boolean; data: any }> {
    let params = new HttpParams();
    if (language) {
      params = params.set("language", language);
    }
    return this.http.get<{ success: boolean; data: any }>(
      `${this.apiUrl}nutrition`,
      {
        params,
      },
    );
  }

  // Fetch single item by ID
  getNutritionById(id: any): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.apiUrl}nutrition/${id}`,
    );
  }

  // Create Item
  createNutritionItem(item: any): Observable<{ success: boolean; data: any }> {
    return this.http.post<{ success: boolean; data: any }>(
      `${this.apiUrl}nutrition`,
      item,
    );
  }

  // Update Item
  updateNutritionItem(
    id: any,
    item: any,
  ): Observable<{ success: boolean; data: any }> {
    return this.http.put<{ success: boolean; data: any }>(
      `${this.apiUrl}nutrition/${id}`,
      item,
    );
  }

  // Delete Item
  deleteNutritionItem(id: any): Observable<{ success: boolean; message: any }> {
    return this.http.delete<{ success: boolean; message: any }>(
      `${this.apiUrl}nutrition/${id}`,
    );
  }

  fetchUsers() {
    return this.http.get<any>(`${this.apiUrl}registered-users`);
  }

  updateUser(userId: any, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}registered-users/${userId}`, item);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}registered-users/${id}`);
  }
}
