<?php
class Product
{
    public function getData()
    {
        $json = file_get_contents('products.json');
        $data = json_decode($json, true);

        return $data;
    }
    public function getCountProduct()
    {
        return count($this->getData());
    }
    public function getImage($id)
    {
        $data = $this->getData();
        return $data[$id]['img'];
    }
    public function getTitle($id)
    {
        $data = $this->getData();
        return $data[$id]['title'];
    }
    public function getRating($id)
    {
        $data = $this->getData();
        return $data[$id]['rating'];
    }
    public function getPrice($id)
    {
        $data = $this->getData();
        return $data[$id]['price'];
    }
    public function getActions($id)
    {
        $data = $this->getData();
        return $data[$id]['actions'];
    }
    public function getUrl($id)
    {
        $data = $this->getData();
        return $data[$id]['url'];
    }
    public function getPostRating($id)
    {
        for ($i = 0; $i < $this->getRating($id); $i++) {
            echo '<span style="color: gold">✩</span>';
        }
        for ($i = 0; $i < 5 - $this->getRating($id); $i++) {
            echo '<span>✩</span>';
        }
    }
    public  function  getDiscount($id)
    {
        $data = $this->getData();
        return round(100 - $data[$id]['price']['finalPrice'] / $data[$id]['price']['oldPrice'] * 100);
    }
    public function isOnSalePrice($id)
    {
        return !($this->getPrice($id)['oldPrice'] == $this->getPrice($id)['finalPrice']);
    }
}
