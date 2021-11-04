export default function ({ $auth, redirect }) {
    if (!$auth.user.role == 0) {
        return redirect('/')
    }
}
