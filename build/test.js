import gulp from "gulp";
import tslint from "gulp-tslint";
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

gulp.task("tslint", () =>
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
);