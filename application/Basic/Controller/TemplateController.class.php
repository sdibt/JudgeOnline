<?php
/**
 * drunk , fix later
 * Created by Magic.
 * User: jiaying
 * Datetime: 27/11/2017 22:47
 */

namespace Basic\Controller;


use Think\Controller;

class TemplateController extends Controller
{
    protected $userInfo = null;

    protected $isNeedLogin = false;
    protected $isNeedFilterSql = false;

    public $module = null;
    public $controller = null;
    public $action = null;

    public function _initialize() {

        header("Pragma: no-cache");
        // HTTP/1.0
        header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
        // HTTP/1.1

        $this->module = strtolower(MODULE_NAME);
        $this->controller = strtolower(CONTROLLER_NAME);
        $this->action = strtolower(ACTION_NAME);

        $this->initSqlInjectionFilter();
        $this->initLoginUserInfo();
    }

    private function initLoginUserInfo() {
        if (!$this->isNeedLogin) return;
        $userId = session('user_id');
        if (!empty($userId)) {
            $field = array('user_id', 'nick');
            //$this->userInfo = UserModel::instance()->getUserByUid($userId, $field);
        } else {
            redirect(U('Home/User/login'), 1, 'Please Login First!');
        }
    }

    private function initSqlInjectionFilter() {
        if (function_exists('sqlInjectionFilter') && $this->isNeedFilterSql) {
            sqlInjectionFilter();
        }
    }

    protected function alertError($errmsg, $url = '') {
        $url = empty($url) ? "window.history.back();" : "location.href=\"{$url}\";";
        echo "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
        echo "<script>function Mytips(){alert('{$errmsg}');{$url}}</script>";
        echo "</head><body onload='Mytips()'></body></html>";
        exit;
    }

    protected function auto_display($view = null, $layout = true) {
        layout($layout);
        $this->display($view);
    }

    protected function zadd($name, $data) {
        $this->assign($name, $data);
    }

    protected function ZaddWidgets($widgets) {
        foreach ($widgets as $name => $data) {
            $this->zadd($name, $data);
        }
    }

    protected function initSessionByUserId($userId) {
        session('user_id', $userId);
        $_privileges = null;//PrivilegeModel::instance()->getPrivilegesByUserId($userId);
        foreach ($_privileges as $privilege) {
            session($privilege['rightstr'], true);
        }
    }

    protected function isSuperAdmin() {
        $isAdmin = session('administrator');
        return !empty($isAdmin);
    }

    protected function isCreator() {
        if ($this->isSuperAdmin()) {
            return true;
        }
        $isCreator = session('contest_creator');
        return !empty($isCreator);
    }

    protected function isProblemSetter() {
        if ($this->isSuperAdmin()) {
            return true;
        }
        $isSetter = session('problem_editor');
        return !empty($isSetter);
    }

    protected function isTeacher() {
        if ($this->isSuperAdmin() || $this->isCreator() || $this->isProblemSetter()) {
            return true;
        } else {
            return false;
        }
    }
}