package com.codewild.nameper.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created with IntelliJ IDEA.
 * User: Mike
 * Date: 11/17/13
 * Time: 9:50 PM
 * To change this template use File | Settings | File Templates.
 */
@XmlRootElement
public class NameModel {
    private String name;
    private String gender;
    private String origin;
    private String meaning;

    public NameModel(String name, String gender) {
        this.name = name;
        this.gender = gender;
    }

    public NameModel(String name, String gender, String origin, String meaning) {
        this.name = name;
        this.gender = gender;
        this.origin = origin;
        this.meaning = meaning;
    }

    public NameModel() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }
}
