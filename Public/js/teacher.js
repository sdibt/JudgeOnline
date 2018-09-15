function suredo(e, t) {
    var r;
    return r = confirm(t),
        "" == e ? r : void (0 != r && (window.location.href = e))
}
function chkexam() {
    var e = 0;
    return $("input[type='text']").each(function() {
        return "" == $(this).val() ? (alert("请填写完整信息!"),
            $(this).focus(),
            e++,
            !1) : void 0
    }),
        e ? !1 : !0
}
function chkchoose(e) {
    return "" == $("#choose_des").val() ? (alert("题目描述不能为空"),
        $("#choose_des").focus(),
        !1) : "" == $("#ams").val() ? (alert("选项A描述不能为空"),
        $("#ams").focus(),
        !1) : "" == $("#bms").val() ? (alert("选项B描述不能为空"),
        $("#bms").focus(),
        !1) : "" == $("#cms").val() ? (alert("选项C描述不能为空"),
        $("#cms").focus(),
        !1) : "" == $("#dms").val() ? (alert("选项D描述不能为空"),
        $("#dms").focus(),
        !1) : "" == e.answer.value ? (alert("答案不能为空"),
        !1) : !0
}
function chkjudge(e) {
    return "" == e.judge_des.value ? (alert("请输入题目描述"),
        e.judge_des.focus(),
        !1) : "" == e.answer.value ? (alert("请输入答案!"),
        !1) : "" == e.point.value ? (alert("请输入知识点"),
        e.point.focus(),
        !1) : !0
}
function chkfill(e) {
    if ("" == e.fill_des.value)
        return alert("请输入题目描述"),
            e.fill_des.focus(),
            !1;
    for (var t = $("#numanswer").val(), r = 1; t >= r; r++)
        if ("" == $("#answer" + r).val())
            return alert("答案" + r + "不能为空"),
                $("#answer" + r).focus(),
                !1;
    return !0
}
function showmsg() {
    $("#msg").show(),
        0 == $("#isprivate").val() ? $("#msg").html("(*公共题库所有人都可见)") : 1 == $("#isprivate").val() ? $("#msg").html("(*私人题库仅限本人和最高管理员可见)") : 2 == $("#isprivate").val() && $("#msg").html("(*系统隐藏选择确认后,仅限最高管理员可以查看和修改，请谨慎选择和查看)")
}
function showspan() {
    1 == $("#kind").val() ? $("#warnmsg").html("(*请确保下面文本框个数与题目中的填空数相同)") : 2 == $("#kind").val() ? $("#warnmsg").html("(*请确保空数个数与程序在编译器端运行结果的行数一致)") : 3 == $("#kind").val() && $("#warnmsg").html("(*请确保下面文本框个数与题目中的填空数相同)")
}
function addinput() {
    var e = $("#numanswer").val();
    if (8 > e) {
        e++;
        var t = $("<div>", {
            id: "divans" + e,
            "class": "col-md-4"
        })
            , r = $("<input>", {
            type: "text",
            "class": "form-control",
            name: "answer" + e,
            id: "answer" + e,
            placeholder: "答案" + e
        });
        t.append(r),
            $("#Content").append(t),
            $("#numanswer").val(e)
    } else
        alert("空数已达到上限")
}
function delinput() {
    var e = $("#numanswer").val();
    e > 0 ? ($("#divans" + e).remove(),
        e--,
        $("#numanswer").val(e)) : alert("Nothing to be deleted")
}
function xs_search() {
    var e = $("#xs_userid").val()
        , t = $("#xs_name").val()
        , r = $("#xs_choose option:selected").val()
        , o = $("#xs_judge option:selected").val()
        , a = $("#xs_fill option:selected").val()
        , n = $("#xs_program option:selected").val()
        , s = $("#xs_score option:selected").val()
        , l = $("#eid").val();
    scoreurl = scoreurl + "?eid=" + l,
    "" != e && (scoreurl = scoreurl + "&xsid=" + encodeURIComponent(e)),
    "" != t && (scoreurl = scoreurl + "&xsname=" + encodeURIComponent(t));
    var i = 0
        , c = 0;
    1 == r ? i |= 1 : 2 == r && (c |= 1),
        1 == o ? i |= 2 : 2 == o && (c |= 2),
        1 == a ? i |= 4 : 2 == a && (c |= 4),
        1 == n ? i |= 8 : 2 == n && (c |= 8),
        1 == s ? i |= 16 : 2 == s && (c |= 16),
        scoreurl = scoreurl + "&sortanum=" + i + "&sortdnum=" + c,
        window.location.href = scoreurl
}
function subform() {
    $("#rjallform").submit()
}

function addProblem2Exam(url, examId, problemId, type, that) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: "eid=" + examId + "&id=" + problemId + "&type=" + type + "&sid=" + Math.random(),
        success: function (t) {
            var str = '<a href="javascript:void(0);" class="deltoexam" data-pid="' + problemId +
                '" data-type="'+ type + '"> <span class="glyphicon glyphicon-remove" style="color: darkred"></span> </a>';
            $(that).parent().html(str);
        },
        error: function() {
            alert("添加题目失败, 请刷新重试");
        }
    });
}

function deleteProblem2Exam(url, examId, problemId, type, that, isSelect) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: "eid=" + examId + "&id=" + problemId + "&type=" + type + "&sid=" + Math.random(),
        success: function (t) {
            if ("ok" == t) {
                if (!isSelect) {
                    var r = $(that).parent().parent();
                    $(r).slideUp("slow", function () {
                        $(this).remove();
                    });
                } else {
                    var str = '<a href="javascript:void(0);" class="addtoexam" data-pid="' + problemId +
                        '" data-type="'+ type + '"> <span class="glyphicon glyphicon-plus"></span> </a>';
                    $(that).parent().html(str);
                }
            } else {
                alert(t);
            }
        },
        error: function() {
            alert("题目删除失败, 请刷新重试~");
        }
    });
}


