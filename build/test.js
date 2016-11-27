import gulp from "gulp";
import {
    exec
} from "child_process";

gulp.task("test", (done) => {
    exec("jasmine-ts 'src/**/*.spec.ts'", (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
});

gulp.task("tdd", () => {
    let _watchables = ["src/**/*.ts"];

    return gulp.watch(_watchables, ["test"]);
});