(ns adventofcode.day04
  (:use [digest])
  (:require [clojure.string :as str]))
  
;; Start with the input
(def in (-> "resources/day04input" slurp str/trim-newline))

(defn makemd5
  "Create an MD5 out of a prefix and a suffix."
  [prefix suffix]
  (digest/md5 (str prefix suffix)))

(def mymd5
  "Specific MD5-maker with my specific prefix."
  (partial makemd5 in))

(defn md5num-map
  "For a given number n (as the suffix), return a map
  of the MD5 and the number."
  [n]
  {:md5 (mymd5 n)
   :num n})

(defn zero-prefix?
  "Returns true if the given MD5 value of an md5num map
  starts with n zeroes."
  [n md5num-map]
  (nil?
    (re-find
      (re-pattern (apply str \^ (repeat n 0)))
      (md5num-map :md5))))

(defn solve
  "..."
  [& args]
  (println

    ;; Part 1
    (first
      (drop-while
        (partial zero-prefix? 5)
        (map md5num-map (range))))

    ;; Part 2
    (first
      (drop-while
        (partial zero-prefix? 6)
        (map md5num-map (range))))

    ))
