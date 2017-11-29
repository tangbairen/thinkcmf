<?php

namespace Portal\Controller;
use Common\Controller\HomebaseController;

class NewsController extends HomebaseController {

    /*
     * 新闻首页
     * */
    public function index()
    {
        $this->display(":news");

    }

}