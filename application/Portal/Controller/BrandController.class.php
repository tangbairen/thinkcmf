<?php

namespace Portal\Controller;
use Common\Controller\HomebaseController;

class BrandController extends HomebaseController {

    //首页 小夏是老猫除外最帅的男人了
    public function index() {

        $this->display(":brand");
    }

}